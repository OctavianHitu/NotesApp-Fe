import { defineStore } from 'pinia'

export let useSessStorage = defineStore('sessStorage', {
  state() {
    return {
      sessLength: false
    }
  },
  actions: {
    getStatus() {
      if (sessionStorage.length != 0) {
        this.sessLength = true
      } else {
        this.sessLength = false
      }
    }
  }
})
