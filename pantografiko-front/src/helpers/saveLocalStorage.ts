const statePageLogin = (state: boolean) => {
  localStorage.setItem('startPage', JSON.stringify(state));
}

const fetchPageLogin = () => {
  const fetchLogin = JSON.parse(localStorage.getItem("startPage") || '{}');
  return fetchLogin;
}

const saveUserLogin = (login: string) => {
  localStorage.setItem('login', JSON.stringify(login));
}

const fetchUserLogin = ():any => {
  const fetchUser = JSON.parse(localStorage.getItem("login") || 'null');
  return fetchUser;
}

const removeUserLogin = () => {
  return localStorage.removeItem("login");
}

export {
  statePageLogin,
  fetchPageLogin,
  saveUserLogin,
  fetchUserLogin,
  removeUserLogin
}