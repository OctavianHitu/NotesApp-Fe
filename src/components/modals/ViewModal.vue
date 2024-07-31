<script setup>
import { useFormat } from '@/composables/useFormat'
import { ref } from 'vue'
import FormButton from '@/components/buttons/FormButton.vue'
import TabbleTexarea from '@/components/TabbleTexarea.vue'
import { useAxios } from '@/composables/useAxios'
import { useJwtDecode } from '@/composables/useJwtDecode'
import { useNotesStore } from '@/stores/NotesStore'
import { useSwal } from '@/composables/useSwal'
let { error } = useSwal()
let { decodeJwt } = useJwtDecode()
let { axiosPatch } = useAxios()
let { formatDate } = useFormat()
let notes = useNotesStore()
let props = defineProps({
  show: Boolean,
  note: {
    id: String,
    name: String,
    body: String,
    image: String,
    updated_at: String,
    created_at: String
  }
})
let isView = ref(true)
let editNote = ref({
  id: props.note.id,
  name: props.note.name,
  body: props.note.body
})

const emit = defineEmits(['close'])
const action = () => emit('close')

function closeModal() {
  isView.value = true
  action()
}

async function updateNote() {
  axiosPatch(
    'noterr',
    {
      note_id: editNote.value.id,
      name: editNote.value.name,
      body: editNote.value.body
    },
    {
      Authorization: 'Bearer ' + decodeJwt().access_token,
      Accept: 'application/json'
    }
  )
    .then(() => {
      action()
      isView.value = true
      notes.getNotes()
    })
    .catch(() => {
      error('Error when deleting!')
    })
}
</script>

<template>
  <div v-if="show" class="background-modal-view">
    <div class="modal">
      <div v-if="!isView">EDIT NOTE</div>
      <div class="modal-header">
        <div v-if="isView" style="display: flex; justify-content: center; align-items: center">
          {{ note.name.toLocaleUpperCase() }}
        </div>
        <div v-else>
          <input v-model="editNote.name" placeholder="Note Name" />
        </div>
        <button class="exit-btn" @click="closeModal">EXIT</button>
      </div>
      <div class="modal-dates">
        <div>Created: {{ formatDate(note.created_at) }}</div>
      </div>
      <div>
        Content
        <div v-if="isView" class="note-body">
          {{ note.body }}
        </div>
        <div v-else>
          <TabbleTexarea
            placeholder="Type your ideas here..."
            style="height: 10rem; width: 100%"
            v-model="editNote.body"
          />
        </div>
      </div>
      <div class="footer-note">
        <div class="footer-note-btn" v-if="isView">
          <FormButton @click="isView = false" name="Edit" />
        </div>
        <div class="footer-note-btn" v-else>
          <FormButton @click="isView = true" name="Cancel" />
          <FormButton @click="updateNote" name="Update" type="brown large" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.background-modal-view {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  .modal {
    padding: 3rem;
    height: fit-content;
    width: 40vw;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-weight: bold;
    border-radius: 10px;
    .modal-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      font-size: xx-large;

      input {
        font-family: source-code-pro, Menlo, Monaco, 'Courier New';

        border: none;
        border-bottom: 1px solid black;
        height: 2rem;
        outline: none;
        border-radius: 10px 10px 0px 0px;

        &:focus {
          background-color: rgba($color: #000000, $alpha: 0.05);
        }
      }
      .exit-btn {
        background-color: transparent;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .modal-dates {
      display: flex;
      justify-content: space-between;
      font-size: large;
    }
    .note-body {
      border-top: 1px solid black;
      padding-top: 1rem;
      white-space: pre-wrap;
      word-wrap: break-word;
      height: fit-content;
      width: 100%;
    }
    .footer-note {
      .footer-note-btn {
        display: flex;
        justify-content: end;
        gap: 2rem;
      }
    }
  }
}
</style>
