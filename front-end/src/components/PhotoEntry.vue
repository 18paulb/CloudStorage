<template>
  <div class="content">
    <div v-for="photo in photos" :key="photo.id" class="imageBox">
      <h2>TITLE: {{photo.title}} ID:{{photo.id}} DATE: {{photo.created}}</h2>
      <img :src="photo.path"/>
      <br>
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
        //this.getPhotos();
      } catch(error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  width: 100%;
  align-content: center;
  flex-direction: column;
}
img {
  width: 60%;
}
</style>
