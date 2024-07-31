import { jwtDecode } from 'jwt-decode'

export function useJwtDecode() {
  function decodeJwt() {
    let jwt = sessionStorage.getItem('LoggedUser')
    if (jwt) {
      const json = jwtDecode(jwt)
      return json
    } else {
      return null
    }
  }

  return { decodeJwt }
}
