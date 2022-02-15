export default function authHeader(): any {
  const user = JSON.parse(localStorage.getItem('token') || '{}');

  // if(user && user.accessToken) {
  //   return { Authorization: 'Bearer' + user.accessToken };
  // } else {
  //    return {}
  // }
  // if(user) {
  //   return { Autho}
  // }


}