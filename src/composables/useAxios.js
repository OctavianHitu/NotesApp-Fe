import axios from 'axios'

export function useAxios() {
  const defaultApi = 'http://NotesApp.test/api/'

  function axiosPost(api, data, hrds) {
    return axios.post(defaultApi + api, data, {
      headers: hrds
    })
  }
  function axiosGet(api, hrds) {
    return axios.get(defaultApi + api, {
      headers: hrds
    })
  }
  function axiosDelete(api, hrds) {
    return axios.delete(defaultApi + api, {
      headers: hrds
    })
  }
  function axiosPatch(api, data, hrds) {
    return axios.patch(defaultApi + api, data, {
      headers: hrds
    })
  }

  return { axiosPost, axiosGet, axiosDelete, axiosPatch }
}
