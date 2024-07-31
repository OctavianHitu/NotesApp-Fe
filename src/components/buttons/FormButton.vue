<script setup>
defineProps({
  name: String,
  type: {
    type: String,
    default: 'chilli large'
  }
})
</script>
<template>
  <button class="formButtonClass" :class="type">
    {{ name }}
  </button>
</template>
<style lang="scss">
@import '@/assets/colors/colors.scss';
.formButtonClass {
  border: none;
  padding: 0.6rem 1.2rem 0.6rem 1.2rem;
  border-radius: 10px;
  color: white;
  font-family: source-code-pro, Menlo, Monaco, 'Courier New';
  font-weight: bold;
  justify-content: center;
  cursor: pointer;

  &.large {
    font-size: large;
  }
  &.small {
    font-size: small;
  }

  &.chilli {
    background-color: $chilli-red;
  }
  &.brown {
    background-color: $brown;
  }
  &.satin {
    background-color: $satin-gold;
  }
  &:active {
    transform: translateY(1px);
  }
}
</style>
