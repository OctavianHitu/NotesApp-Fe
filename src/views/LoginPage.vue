<script setup>
import { ref } from 'vue'
import { useSwal } from '@/composables/useSwal'
import { useAxios } from '@/composables/useAxios'
import router from '@/router'
import { useSessStorage } from '@/stores/sessionStrorageIndicator'
let sessStorage = useSessStorage()
let { success, error } = useSwal()
let { axiosPost } = useAxios()
let helper = ref(true)
const emailregex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
const nameRegex = RegExp(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/)
let userInputs = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

function verifyRegister() {
  let msj = ''
  if (!nameRegex.test(userInputs.value.name)) {
    msj += 'You need to write a valid name!\n'
  }
  if (!emailregex.test(userInputs.value.email)) {
    msj += 'You need to write a valid email!\n'
  }
  if (userInputs.value.password.length < 3) {
    msj += 'Password must me at least 3 characters!\n'
  }
  if (userInputs.value.password != userInputs.value.confirmPassword) {
    msj += 'Password confirmation does not match!'
  }

  if (msj != '') {
    error(msj)
    return false
  }
  return true
}

async function registerUser() {
  if (verifyRegister()) {
    await axiosPost(
      'register',
      {
        name: userInputs.value.name,
        email: userInputs.value.email,
        password: userInputs.value.password
      },
      {
        'Content-Type': 'application/json'
      }
    )
      .then(() => {
        success('Account created succsefully!')
      })
      .catch(() => {
        error('Error when creating account!')
      })
  }
}

function verifyLogin() {
  let msj = ''
  if (!emailregex.test(userInputs.value.email)) {
    msj += 'You need to write a valid email!\n'
  }
  if (userInputs.value.password.length < 3) {
    msj += 'Password must me at least 3 characters!'
  }

  if (msj != '') {
    error(msj)
    return false
  }
  return true
}

async function loginUser() {
  if (verifyLogin()) {
    await axiosPost(
      'login',
      {
        email: userInputs.value.email,
        password: userInputs.value.password
      },
      {
        'Content-Type': 'application/json'
      }
    )
      .then((res) => {
        sessionStorage.setItem('LoggedUser', JSON.stringify(res.data.data.jwt))
        success('Successfully logged in!')

        setTimeout(() => {
          router.push({ path: '/notes/allNotes' })
          sessStorage.getStatus()
        }, 1000)
      })
      .catch(() => {
        error('Error when trying to log in!')
      })
  }
}
</script>
<template>
  <div class="fullLoginPage">
    <div class="semiLoginPage">
      <div style="display: flex; justify-content: space-around">
        <button class="chooser" :class="{ active: !helper }" @click="helper = false">LOGIN</button>
        <button class="chooser" :class="{ active: helper }" @click="helper = true">REGISTER</button>
      </div>
      <input v-model="userInputs.name" v-show="helper" type="text" placeholder="Name" />

      <input v-model="userInputs.email" @change="validateEmail" placeholder="Email" />
      <input v-model="userInputs.password" type="password" placeholder="Password" />
      <input
        v-model="userInputs.confirmPassword"
        type="password"
        v-show="helper"
        placeholder="Confirm password"
      />
      <div>
        <button class="register-login" @click="loginUser" v-if="!helper">LOGIN</button>
        <button class="register-login" @click="registerUser" v-else>REGISTER</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/colors/colors.scss';

.fullLoginPage {
  height: 90%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: top;
  .semiLoginPage {
    box-shadow:
      0 4px 8px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-top: 3rem;
    height: fit-content;
    width: 25%;
    padding: 5rem;
    border-radius: 5%;
    background-color: $white;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .chooser {
      border-radius: 10px;
      font-size: large;
      height: 2rem;
      width: 100%;
      font-family: source-code-pro, Menlo, Monaco, 'Courier New';
      border: none;
      background-color: transparent;
      color: black;
      cursor: pointer;
      &.active {
        background-color: $earth-yellow;
        color: $white;
      }
    }

    input {
      font-family: source-code-pro, Menlo, Monaco, 'Courier New';

      border: none;
      border-bottom: 1px solid black;
      height: 2.5rem;
      outline: none;
      border-radius: 10px 10px 0px 0px;

      &:focus {
        background-color: rgba($color: #000000, $alpha: 0.05);
      }
    }
    .register-login {
      border-radius: 10px;
      font-size: large;
      height: 3rem;
      width: 100%;
      font-family: source-code-pro, Menlo, Monaco, 'Courier New';
      border: none;
      background-color: $earth-yellow;
      color: $white;
      cursor: pointer;
    }
  }
}
</style>
