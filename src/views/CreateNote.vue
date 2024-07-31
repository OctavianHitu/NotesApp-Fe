<script setup>
import TabbleTexarea from '@/components/TabbleTexarea.vue'
import { ref } from 'vue'
import { useJwtDecode } from '@/composables/useJwtDecode'
import FormButton from '@/components/buttons/FormButton.vue'
import { useSwal } from '@/composables/useSwal'
import { useAxios } from '@/composables/useAxios'
let { axiosPost } = useAxios()
let { success, error } = useSwal()
let { decodeJwt } = useJwtDecode()
let note = ref({
  user_id: decodeJwt().user_id,
  name: '',
  body: '',
  image: '',
  updated_at: new Date(),
  created_at: new Date()
})
async function createNote() {
  if (note.value.name === '' || note.value.body === '' || note.value.image === '') {
    error('You need to fill al inputs!')
  } else {
    await axiosPost(
      'note',
      {
        user_id: note.value.user_id,
        name: note.value.name,
        body: note.value.body,
        image: note.value.image,
        updated_at: note.value.updated_at,
        created_at: note.value.created_at
      },

      {
        Authorization: 'Bearer ' + decodeJwt().access_token,
        'Content-Type': 'application/json'
      }
    )
      .then(() => {
        success('Note created successfully!')
      })
      .catch((err) => {
        if (err.response.status == 500) {
          error('You have a note with the same name!')
        } else {
          error('Error when creating note!')
        }
      })
  }
}
</script>

<template>
  <div class="create-note-full">
    <div class="create-note-partial">
      <div class="cr-note-wr">NEW NOTE</div>
      <input v-model="note.name" placeholder="Note Name" />
      <TabbleTexarea
        placeholder="Type your ideas here..."
        style="height: 10rem"
        v-model="note.body"
      />
      <div>
        <div style="margin-bottom: 1rem">Note image:</div>
        <div class="images-radio">
          <div class="single-radio-img">
            <input type="radio" id="one" value="img1.svg" v-model="note.image" />
            <label for="one"
              ><img style="height: 40px" src="@/assets/svgs/noteImg/img1.svg"
            /></label>
          </div>
          <div class="single-radio-img">
            <input type="radio" id="two" value="img2.svg" v-model="note.image" />
            <label for="two"
              ><img style="height: 40px" src="@/assets/svgs/noteImg/img2.svg"
            /></label>
          </div>
          <div class="single-radio-img">
            <input type="radio" id="three" value="img3.svg" v-model="note.image" />
            <label for="three"
              ><img style="height: 40px" src="@/assets/svgs/noteImg/img3.svg"
            /></label>
          </div>
          <div class="single-radio-img">
            <input type="radio" id="four" value="img4.svg" v-model="note.image" />
            <label for="four"
              ><img style="height: 40px" src="@/assets/svgs/noteImg/img4.svg"
            /></label>
          </div>
          <div class="single-radio-img">
            <input type="radio" id="five" value="img5.svg" v-model="note.image" />
            <label for="five"
              ><img style="height: 40px" src="@/assets/svgs/noteImg/img5.svg"
            /></label>
          </div>
        </div>
      </div>
      <FormButton @click="createNote()" name="Create" />
    </div>
  </div>
</template>

<style lang="scss">
.create-note-full {
  height: 100%;
  width: 100%;

  .create-note-partial {
    margin: 5rem 0rem 0rem 10rem;
    height: 60%;
    width: 30%;
    padding: 3rem;
    background-color: white;
    box-shadow:
      0 4px 8px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    .cr-note-wr {
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
    }
    input {
      font-family: source-code-pro, Menlo, Monaco, 'Courier New';

      border: none;
      border-bottom: 1px solid black;
      height: 2.5rem;
      outline: none;
      border-radius: 10px 10px 0px 0px;

      &:focus {
        background-color: rgba($color: #000000, $alpha: 0.05);
      }
    }

    .images-radio {
      display: flex;
      gap: 2.8rem;

      .single-radio-img {
        display: flex;
      }
    }
  }
}
</style>
