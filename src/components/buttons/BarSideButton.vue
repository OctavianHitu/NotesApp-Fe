<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  name: String,
  toLink: String,
  photo: String
})
</script>

<template>
  <button class="buttonClass">
    <RouterLink class="no-underline" :to="toLink">
      <img :src="photo" />

      {{ name }}</RouterLink
    >
  </button>
</template>

<style lang="scss">
@import '@/assets/colors/colors.scss';
.buttonClass {
  width: 100%;
  border: none;
  padding: 1rem;
  background-color: $satin-gold;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  img {
    height: 30px;
  }
  .no-underline {
    text-decoration: none;
    color: white;
    font-family: source-code-pro, Menlo, Monaco, 'Courier New';
    font-size: large;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  &:active {
    background-color: $earth-yellow;
  }
}
</style>
