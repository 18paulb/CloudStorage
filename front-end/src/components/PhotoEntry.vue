<template>
  <div>
    <div v-for="photo in photos" :key="photo.id">
      <h2>{{photo.title}}</h2>
      <img :src="photo.path"/>
      <button @click="deletePhoto(photo)">DELETE PHOTO</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "PhotoEntry",
  props: {
    photos: Array,
  },
  methods: {
    async deletePhoto(photo) {
      try {
        await axios.delete("api/photo/" + photo._id);
        this.getPhotos();
      } catch(error) {
        console.log(error);
      }
    }
  }
}
</script>
