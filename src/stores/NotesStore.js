import { defineStore } from 'pinia'
import { useAxios } from '@/composables/useAxios'
import { useJwtDecode } from '@/composables/useJwtDecode'

let { axiosGet } = useAxios()
let { decodeJwt } = useJwtDecode()
export let useNotesStore = defineStore('notes', {
  state() {
    return {
      notes: []
    }
  },
  actions: {
    getNotes() {
      axiosGet('note/' + decodeJwt().user_id, {
        Authorization: 'Bearer ' + decodeJwt().access_token,
        'Content-Type': 'application/json'
      }).then((res) => {
        this.notes = res.data.data
      })
    }
  },
  getters: {
    allPageNumbers(state) {
      return Math.ceil(state.notes.length / 4)
    }
  }
})
