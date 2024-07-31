<script setup>
import { onMounted } from 'vue'
import HeaderButton from '../buttons/HeaderButton.vue'
import { useSessStorage } from '@/stores/sessionStrorageIndicator'
let sessStorage = useSessStorage()
// let connected = computed(() => (sessionStorage.length != 0 ? true : false))
onMounted(() => {
  sessStorage.getStatus()
})
function signout() {
  sessionStorage.clear()
  sessStorage.getStatus()
}
</script>

<template>
  <div class="upper_header">
    <div class="header-left-side">NOTES</div>
    <div class="header-right-side">
      <div v-if="!sessStorage.sessLength">
        <HeaderButton type="brown" name="LOGIN/REGISTER" toLink="/login" />
      </div>
      <div v-else>
        <HeaderButton @click="signout()" type="brown" name="LOGOUT" toLink="/login" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/colors/colors.scss';
.upper_header {
  background-color: $satin-gold;
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-left-side {
    padding-left: 2rem;
    font-size: 2.5rem;
    font-weight: bold;
    color: $white;
  }
  .header-right-side {
    padding-right: 2rem;
  }
}
</style>
