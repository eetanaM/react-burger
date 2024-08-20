import { jwtDecode } from "jwt-decode";

const signInApiConfig = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

const getResponse = (res:any) => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(res.status);
};

const getExpirationTime = (token: string) => {
  const decodedToken = jwtDecode(token)
  return decodedToken.exp?.toString()
}

const saveTokens = (accessToken: string, refreshToken: string) => {
  const expiresAt = getExpirationTime(accessToken)
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  if (expiresAt) {
    localStorage.setItem('expiresAt', expiresAt);
  }
}

export const getStoredToken = (tokenName: string) => {
  return localStorage.getItem(tokenName);
}


export const getIngredients = async () => {
  return fetch(`${signInApiConfig.baseUrl}/ingredients`)
    .then(getResponse)
    .then((ingredients) => ingredients.data);
};

export const getOrderData = async (ingredientsToOrder: string[]) => {
  const accessToken = getStoredToken('accessToken');
  if (!accessToken) {
    throw new Error('Can not get order data without access token');
  }
  return fetch(`${signInApiConfig.baseUrl}/orders`, {
    method: "POST",
    headers: {
      ...signInApiConfig.headers,
      Authorization: accessToken,
    },
    body: JSON.stringify({ ingredients: ingredientsToOrder }),
  }).then(getResponse);
};

export const resetPassword = async (email: string) => {
  return fetch(`${signInApiConfig.baseUrl}/password-reset`, {
    method: "POST",
    headers: signInApiConfig.headers,
    body: JSON.stringify({ email: email }),
  }).then(getResponse)
    .then(data => data);
};

export const refreshPassword = async (password: string, token: string) => {
  return fetch(`${signInApiConfig.baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: signInApiConfig.headers,
    body: JSON.stringify({ password: password, token: token }),
  }).then(getResponse)
    .then(data => data);
};

export const registerUser = async (email: string, password: string, userName: string) => {
  return fetch(`${signInApiConfig.baseUrl}/auth/register`, {
    method: "POST",
    headers: signInApiConfig.headers,
    body: JSON.stringify({ email: email, password: password, name: userName }),
  }).then(getResponse)
    .then((data) => {
      if (data.accessToken && data.refreshToken) {
        saveTokens(data.accessToken, data.refreshToken);
      }
      return data
    }
  )
};

export const loginUser = async (email: string, password: string) => {
  return fetch(`${signInApiConfig.baseUrl}/auth/login`, {
    method: "POST",
    headers: signInApiConfig.headers,
    body: JSON.stringify({ email: email, password: password }),
  }).then(getResponse)
    .then((data) => {
      if (data.accessToken && data.refreshToken) {
        saveTokens(data.accessToken, data.refreshToken);
      }
      return data
    }
  )
};

export const refreshToken = async (refreshToken: string) => {
  return fetch(`${signInApiConfig.baseUrl}/auth/token`, {
    method: "POST",
    headers: signInApiConfig.headers,
    body: JSON.stringify({ token: refreshToken }),
  }).then(getResponse)
    .then(data => {
      if (data.accessToken && data.refreshToken) {
        saveTokens(data.accessToken, data.refreshToken);
      }
      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }
    })
};

export const logoutUser = async () => {
  const refreshToken = getStoredToken('refreshToken');
  return fetch(`${signInApiConfig.baseUrl}/auth/logout`, {
    method: "POST",
    headers: signInApiConfig.headers,
    body: JSON.stringify({ token: refreshToken }),
  }).then(getResponse)
    .then(data => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      const expiresAt = localStorage.getItem('expiresAt')
      if (expiresAt) {
        localStorage.removeItem('expiresAt')
      }
      return data
    })
};

export const getUserData = async () => {
  const accessToken = getStoredToken('accessToken');
  if (!accessToken) {
    throw new Error('Access token not available')
  }
  return fetch(`${signInApiConfig.baseUrl}/auth/user`, {
    method: "GET",
    headers: {
      ...signInApiConfig.headers,
      Authorization: accessToken,
    },
  }).then(getResponse)
    .then(data => data)
};

export const configureUserData = async (email: string, password: string, userName: string) => {
  const accessToken = getStoredToken('accessToken');
  if (!accessToken) {
    throw new Error("No access token provided");
  }
  return fetch(`${signInApiConfig.baseUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      ...signInApiConfig.headers,
      Authorization: accessToken,
    },
    body: JSON.stringify({ name: userName, email: email, password: password }),
  }).then(getResponse);
};
