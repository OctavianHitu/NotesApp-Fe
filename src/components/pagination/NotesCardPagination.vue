<script setup>
import { useNotesStore } from '@/stores/NotesStore'
import { onMounted, computed } from 'vue'
import NoteCard from '@/components/noteCard.vue'
let notes = useNotesStore()
onMounted(() => {
  notes.getNotes()
})

let props = defineProps({
  page: Number
})
let startIndex = computed(() => (props.page - 1) * 4)

let selectedNotes = computed(() => notes.notes.slice(startIndex.value, startIndex.value + 4))
</script>

<template>
  <div class="all-notes-view">
    <NoteCard
      v-for="note in selectedNotes"
      :id="note.id"
      :key="note.id"
      :name="note.name"
      :body="note.body"
      :created_at="note.created_at"
      :updated_at="note.updated_at"
      :image="note.image"
    ></NoteCard>
  </div>
</template>

<style lang="scss">
.all-notes-view {
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
