const signInApiConfig = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

const getResponse = (res:any) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json()
      .then((error: Error) => Promise.reject(error))
  }
};

const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
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
    throw new Error('Access token not available');
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

export const refreshToken = async () => {
  const refreshToken = getStoredToken('refreshToken');
  return fetch(`${signInApiConfig.baseUrl}/auth/token`, {
    method: "POST",
    headers: signInApiConfig.headers,
    body: JSON.stringify({ token: refreshToken }),
  }).then(getResponse)
    .then(data => {
      if (!data.success) {
        return Promise.reject(data);
      }
      saveTokens(data.accessToken, data.refreshToken);
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
    throw new Error('Access token not available');
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
