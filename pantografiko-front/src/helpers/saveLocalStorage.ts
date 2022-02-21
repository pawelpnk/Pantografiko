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

interface IUserResponse {
  login: string;
  email: string;
  role: string;
}

const saveUserObject = (user: IUserResponse): void => {
  localStorage.setItem('User', JSON.stringify(user));
}

const fetchUserObject = (): IUserResponse => {
  const fetchOneObject: IUserResponse = JSON.parse(localStorage.getItem('User') || 'null');
  return fetchOneObject;
}

const removeUserObject = (): void => {
  return localStorage.removeItem("User");
}

const saveUserID = (userID: string): void => {
  localStorage.setItem('UserID', JSON.stringify(userID));
}

const fetchUserID = (): string => {
  const fetchUserID: string = JSON.parse(localStorage.getItem('UserID') || 'null');
  return fetchUserID;
}

const removeUserID = (): void => {
  localStorage.removeItem('UserID');
}

export {
  saveUserLogin,
  fetchUserLogin,
  removeUserLogin,
  saveUserObject,
  removeUserObject,
  saveUserID,
  removeUserID,
  fetchUserID,
  fetchUserObject
}