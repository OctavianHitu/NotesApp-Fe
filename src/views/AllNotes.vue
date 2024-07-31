<script setup>
import { onMounted, ref } from 'vue'
import PaginationBar from '@/components/pagination/PaginationBar.vue'
import NotesCardPagination from '@/components/pagination/NotesCardPagination.vue'
import { useNotesStore } from '@/stores/NotesStore'

import NoData from '@/components/Nodata/NoData.vue'
let notes = useNotesStore()
let page = ref(1)

onMounted(() => {
  notes.getNotes()
})
</script>

<template>
  <div class="notes-view" v-if="notes.notes.length > 0">
    <div class="allnotes-part">
      <NotesCardPagination :page="page" />
    </div>
    <div class="allnotes-part pagbar">
      <PaginationBar v-model="page" />
    </div>
  </div>
  <NoData v-else :type="false" />
</template>

<style lang="scss">
.notes-view {
  height: 100%;
  display: grid;
  grid-template-rows: 60% 40%;
  width: fit-content;
  .allnotes-part {
    padding: 3rem;
    display: flex;
    justify-content: center;

    &.pagbar {
      align-items: start;
    }
  }
}
</style>
