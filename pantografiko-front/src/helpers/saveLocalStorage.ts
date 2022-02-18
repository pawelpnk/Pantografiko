const saveUserLogin = (login: string): void => {
  localStorage.setItem('login', JSON.stringify(login));
}

const fetchUserLogin = (): string => {
  const fetchUser: string = JSON.parse(localStorage.getItem("login") || 'null');
  return fetchUser;
}

const removeUserLogin = (): void => {
  return localStorage.removeItem("login");
}

export {
  saveUserLogin,
  fetchUserLogin,
  removeUserLogin
}