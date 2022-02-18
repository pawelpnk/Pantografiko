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
  saveUserLogin,
  fetchUserLogin,
  removeUserLogin
}