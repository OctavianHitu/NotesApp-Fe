<script setup>
import BarSide from '@/components/sidebar/BarSide.vue'
import NoData from '@/components/Nodata/NoData.vue'

function connected() {
  if (sessionStorage.length != 0) {
    return true
  } else {
    return false
  }
}
</script>

<template>
  <div v-if="connected()" style="display: grid; grid-template-columns: 15% 85%; height: 100%">
    <div>
      <BarSide />
    </div>
    <div>
      <RouterView />
    </div>
  </div>
  <div v-else>
    <NoData />
  </div>
</template>
