<script setup>
defineProps({
  type: {
    type: Boolean,
    default: true
  }
})
</script>
<template>
  <div v-if="type" class="nodata">Login or create an account in order to manage notes!</div>
  <div v-else class="nodata">You have no notes yet!</div>
</template>

<style lang="scss">
@import '@/assets/colors/colors.scss';
.nodata {
  height: 100%;
  width: 100%;
  font-size: 7rem;
  font-weight: bolder;
  color: $satin-gold;
  opacity: 0.5;
  padding-top: 8rem;
  user-select: none;
  text-align: center;
}
</style>
