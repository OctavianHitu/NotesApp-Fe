<script setup>
import BarSideButton from '../buttons/BarSideButton.vue'
import noteMultiple from '@/assets/svgs/noteMULTIPLE.svg'
import notePlus from '@/assets/svgs/notePLUS.svg'
</script>
<template>
  <div class="sidebar">
    <BarSideButton name="My Notes" toLink="/notes/allNotes" :photo="noteMultiple" />
    <br />
    <BarSideButton name="Create Note" toLink="/notes/createNote" :photo="notePlus" />
  </div>
</template>
<style lang="scss">
@import '@/assets/colors/colors.scss';
.sidebar {
  background-color: $satin-gold;
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>
