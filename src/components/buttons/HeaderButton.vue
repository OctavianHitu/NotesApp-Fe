<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  name: String,
  toLink: String,
  type: {
    type: String,
    default: 'chilli'
  }
})
</script>

<template>
  <button class="headerButtonClass" :class="type">
    <RouterLink class="no-underline" :to="toLink">{{ name }}</RouterLink>
  </button>
</template>

<style lang="scss">
@import '@/assets/colors/colors.scss';
.headerButtonClass {
  border: none;
  padding: 0.6rem 1.2rem 0.6rem 1.2rem;
  border-radius: 10px;

  &.chilli {
    background-color: $chilli-red;
  }
  &.brown {
    background-color: $brown;
  }
  &.satin {
    background-color: $satin-gold;
  }

  .no-underline {
    text-decoration: none;
    color: white;
    font-family: source-code-pro, Menlo, Monaco, 'Courier New';

    font-size: large;
  }

  &:active {
    transform: translateY(1px);
  }
}
</style>
