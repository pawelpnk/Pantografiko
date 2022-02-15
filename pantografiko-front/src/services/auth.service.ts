import req from '../helpers/request';

const loginAuth = async (login: any, password: any) => {

  return req
    .post("/login", {
      login,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("token", JSON.stringify(response.data.accessToken));
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