import req from '../helpers/request';
import { saveUserID, saveUserObject } from '../helpers/saveLocalStorage';

const loginAuth = async (login: any, password: any) => {

  return req
    .post("/login", {
      login,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("token", JSON.stringify(response.data.accessToken));
        saveUserObject(response.data.findUser);
        saveUserID(response.data.findUserID);
      }

      return response;
    });
};

const logout = (): void => {
  localStorage.removeItem("token");
};

const getCurrentUser = (): any => {
  const userNow = JSON.parse(localStorage.getItem("token") || '{}');
  return userNow;
};

export {
  loginAuth,
  logout,
  getCurrentUser,
};