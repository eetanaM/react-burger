import {
  IAuthResponse,
  IGetCurrentOrderData,
  IGetIngredients,
  IGetOrderData,
  IGetUserData,
  ILogoutUser,
  IPasswordReset,
  IRefreshToken,
  IRequest
} from "./types/api-types";

const BASE_URL = "https://norma.nomoreparties.space/api/"
export const NORMA_WEB_SOCKET_URL = 'wss://norma.nomoreparties.space/orders'

export const checkResponse = <T>(res: Response): Promise<T & IRequest> => {
  if (res.ok) {
    return res.json();
  }
  if (res.status === 403) {
    return Promise.reject('jwt expired')
  }
  return Promise.reject(`Ошибка ${res.status}`)
}

export const checkSuccess = <T>(res: T & IRequest): Promise<T> => {
  if (res && res.success) {
    return res as unknown as Promise<T>
  }
  return Promise.reject(`Не получен успешный ответ`);
};

export const request = async <T>(endpoint: string, options: RequestInit): Promise<T> => {
  return fetch(`${BASE_URL}${endpoint}`, options)
          .then(checkResponse<T>)
          .then(checkSuccess<T>)
}

const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export const getStoredToken = (tokenName: string) => {
  return localStorage.getItem(tokenName);
}


export const getIngredients = async (): Promise<IGetIngredients> => {
  return request<IGetIngredients>('ingredients', {})
};

export const getOrderData = async (ingredientsToOrder: string[], signal: AbortSignal): Promise<IGetOrderData> => {
  const accessToken = getStoredToken('accessToken');
  if (!accessToken) {
    throw new Error('Access token not available');
  }
  return request<IGetOrderData>('orders', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({ ingredients: ingredientsToOrder }),
    signal: signal
  })
};

export const getCurrentOrderData = async (orderId: string): Promise<IGetCurrentOrderData> => {
  return request<IGetCurrentOrderData>(`orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
};

export const resetPassword = async (email: string): Promise<IPasswordReset> => {
  return request<IPasswordReset>('password-reset', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  }).catch(error => {
      alert("Что-то пошло не так... Попробуйте снова")
      return Promise.reject(`Reset password request failed. Error status ${error.status ? error.status : "unknown"}`)
    })
};

export const refreshPassword = async (password: string, token: string): Promise<IPasswordReset> => {
  return request<IPasswordReset>('password-reset/reset', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password: password, token: token }),
  }).catch(error => {
    alert("Что-то пошло не так... Попробуйте снова")
    return Promise.reject(`Refresh password request failed. Error status ${error.status ? error.status : "unknown"}`)
  })
};

export const registerUser = async (email: string, password: string, userName: string): Promise<IAuthResponse> => {
  return request<IAuthResponse>('auth/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: email, password: password, name: userName }),
  }).then((data) => {
    if (data.accessToken && data.refreshToken) {
        saveTokens(data.accessToken, data.refreshToken);
      }
    return data
  })
};

export const loginUser = async (email: string, password: string): Promise<IAuthResponse> => {
  return request<IAuthResponse>('auth/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: email, password: password })
  }).then((data) => {
      if (data.accessToken && data.refreshToken) {
        saveTokens(data.accessToken, data.refreshToken);
      }
      return data
    })
};

export const refreshToken = async (): Promise<IRefreshToken> => {
  const storedRefreshToken = getStoredToken('refreshToken');
  return request<IRefreshToken>('auth/token', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: storedRefreshToken }),
  }).then(data => {
      saveTokens(data.accessToken, data.refreshToken);
      return data
    })
};

export const logoutUser = async (): Promise<ILogoutUser> => {
  const storedRefreshToken = getStoredToken('refreshToken');
  return request<ILogoutUser>('auth/logout', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: storedRefreshToken }),
  }).then(data => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      return data
    })
};

export const getUserData = async (): Promise<IGetUserData> => {
  const accessToken = getStoredToken('accessToken');
  if (!accessToken) {
    throw new Error('Access token not available')
  }
  return request<IGetUserData>('auth/user', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  })
};

export const configureUserData = async (email: string, password: string, userName: string): Promise<IGetUserData> => {
  const accessToken = getStoredToken('accessToken');
  if (!accessToken) {
    throw new Error('Access token not available');
  }
  return request<IGetUserData>('auth/user', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({ name: userName, email: email, password: password }),
  })
};
