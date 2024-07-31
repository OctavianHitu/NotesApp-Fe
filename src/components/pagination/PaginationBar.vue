<script setup>
import { useNotesStore } from '@/stores/NotesStore'
import { computed } from 'vue'
let notes = useNotesStore()

let props = defineProps({
  modelValue: Number
})
let emit = defineEmits(['update:modelValue'])

const pages = computed(() => Array.from(Array(notes.allPageNumbers).keys()).map((x) => x + 1))

function pageDown() {
  if (props.modelValue > 1) {
    emit('update:modelValue', props.modelValue - 1)
  }
}
function pageUp() {
  if (props.modelValue < notes.allPageNumbers) {
    emit('update:modelValue', props.modelValue + 1)
  }
}
</script>

<template>
  <div class="pagination">
    <button class="btn-pag" @click="pageDown"><</button>
    <div class="numbers-pagination">
      <button @click="emit('update:modelValue', pp)" v-for="pp in pages" :key="pp" class="btn-pag">
        {{ pp }}
      </button>
    </div>
    <button class="btn-pag" @click="pageUp">></button>
  </div>
</template>

<style lang="scss">
@import '@/assets/colors/colors.scss';

.pagination {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  .numbers-pagination {
    display: flex;
    gap: 0.3rem;
  }

  .btn-pag {
    background-color: $satin-gold;
    cursor: pointer;
    color: white;
    border: none;
    letter-spacing: 2px;
    border-radius: 10px;
    padding: 0.5rem 1rem 0.5rem 1rem;
    font-size: 1.3rem;
    font-weight: 600;
    font-family: 'Courier New', Courier, monospace;
  }
}
</style>
