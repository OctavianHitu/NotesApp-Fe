import swal from 'sweetalert'

export function useSwal() {
  function success(message) {
    return swal('Success!', message, 'success')
  }
  function error(message) {
    return swal('Error!', message, 'error')
  }

  return { success, error }
}
