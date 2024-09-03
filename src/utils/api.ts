const BASE_URL = "https://norma.nomoreparties.space/api/"

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`)
}

const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res
 }
 return Promise.reject(`Не получен успешный ответ: ${res}`)
}

const request = async (endpoint: string, options: RequestInit) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess)
}

const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export const getStoredToken = (tokenName: string) => {
  return localStorage.getItem(tokenName);
}


export const getIngredients = async () => {
  return request('ingredients', {}).then(ingredients => ingredients.data)
};

export const getOrderData = async (ingredientsToOrder: string[], signal: AbortSignal) => {
  const accessToken = getStoredToken('accessToken');
  if (!accessToken) {
    throw new Error('Access token not available');
  }
  return request('orders', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({ ingredients: ingredientsToOrder }),
    signal: signal
  })
};

export const resetPassword = async (email: string) => {
  return request('password-reset', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  }).then(data => data)
    .catch(error => {
      alert("Что-то пошло не так... Попробуйте снова")
      console.log("Reset password request failed with error message: " + error.message)
    })
};

export const refreshPassword = async (password: string, token: string) => {
  return request('password/reset-password', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password: password, token: token }),
  }).then(data => data)
    .catch(error => {
    alert("Что-то пошло не так... Попробуйте снова")
    console.log("Refresh password request failed with error message: " + error.message)
  })
};

export const registerUser = async (email: string, password: string, userName: string) => {
  return request('auth/register', {
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

export const loginUser = async (email: string, password: string) => {
  return request('auth/login', {
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

export const refreshToken = async () => {
  const refreshToken = getStoredToken('refreshToken');
  return request('auth/token', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: refreshToken }),
  }).then(data => {
      saveTokens(data.accessToken, data.refreshToken);
      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }
    })
};

export const logoutUser = async () => {
  const refreshToken = getStoredToken('refreshToken');
  return request('auth/logout', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: refreshToken }),
  }).then(data => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      return data
    })
};

export const getUserData = async () => {
  const accessToken = getStoredToken('accessToken');
  if (!accessToken) {
    throw new Error('Access token not available')
  }
  return request('auth/user', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  }).then(data => data)
};

export const configureUserData = async (email: string, password: string, userName: string) => {
  const accessToken = getStoredToken('accessToken');
  if (!accessToken) {
    throw new Error('Access token not available');
  }
  return request('auth/user', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({ name: userName, email: email, password: password }),
  })
};
