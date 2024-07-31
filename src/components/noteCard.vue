<script setup>
import FormButton from './buttons/FormButton.vue'
import { useAxios } from '@/composables/useAxios'
import { useJwtDecode } from '@/composables/useJwtDecode'
import { useNotesStore } from '@/stores/NotesStore'
import { useSwal } from '@/composables/useSwal'
import ViewModal from './modals/ViewModal.vue'
import { ref } from 'vue'
import { useFormat } from '@/composables/useFormat'

let { formatDate, getBodyStart } = useFormat()
let { error } = useSwal()
let notes = useNotesStore()
let { decodeJwt } = useJwtDecode()
let { axiosDelete } = useAxios()
let props = defineProps({
  id: String,
  name: String,
  body: String,
  image: String,
  updated_at: String,
  created_at: String
})

async function deleteNote() {
  await axiosDelete('note/' + props.id, {
    Authorization: 'Bearer ' + decodeJwt().access_token,
    'Content-Type': 'application/json'
  })
    .then(() => {
      notes.getNotes()
    })
    .catch(() => {
      error('Error when deleting!')
    })
}

let showModal = ref(false)
</script>

<template>
  <div class="note-card">
    <div class="photo-part">
      <img v-if="image === 'img1.svg'" src="@/assets/svgs/noteImg/img1.svg" class="img-card" />
      <img v-else-if="image === 'img2.svg'" src="@/assets/svgs/noteImg/img2.svg" class="img-card" />
      <img v-else-if="image === 'img3.svg'" src="@/assets/svgs/noteImg/img3.svg" class="img-card" />
      <img v-else-if="image === 'img4.svg'" src="@/assets/svgs/noteImg/img4.svg" class="img-card" />
      <img v-else-if="image === 'img5.svg'" src="@/assets/svgs/noteImg/img5.svg" class="img-card" />
    </div>
    <div class="note-info">
      <div class="note-card-header">
        <div>{{ name.toLocaleUpperCase() }}</div>
        <div>Last update: {{ formatDate(updated_at) }}</div>
      </div>
      <div class="note-card-info">
        <div>{{ getBodyStart(body) }}...</div>
        <div class="note-card-buttons">
          <FormButton @click="showModal = true" name="View" type="brown small" />
          <FormButton @click="deleteNote" name="Delete" type="chilli small" />
        </div>
      </div>
    </div>
  </div>
  <ViewModal :note="props" :show="showModal" @close="showModal = false" />
</template>

<style lang="scss">
.note-card {
  @import '@/assets/colors/colors.scss';
  height: 6rem;
  width: 60rem;
  background-color: aliceblue;
  display: grid;
  grid-template-columns: 15% 85%;
  border-radius: 15px;
  .photo-part {
    background-color: $earth-yellow;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    .img-card {
      height: 4rem;
    }
  }
  .note-info {
    display: grid;
    grid-template-rows: 50% 50%;
    padding: 1rem;

    .note-card-header {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
    }
    .note-card-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .note-card-buttons {
        display: flex;
        gap: 1rem;
      }
    }
  }
}
</style>
