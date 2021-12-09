<template>
  <div>
    <div class='form'>
      <form>
        <input type='text' v-model='title' placeholder='Title'>
      </form>
      <br/>
      <label>Photo Title</label>
      <p>{{title}}</p> <!--Testing-->

      <textarea v-model='description' placeholder='Description' rows='2' cols='50'></textarea>
      <p>{{description}}</p> <!--Testing-->
      <input type='file' name='photo' @change='fileChanged'>
      <button @click='upload'>Upload</button>
    </div>

    <div class='upload' v-if='addItem'>
      <h2>{{addItem.title}}</h2>
      <img :src='addItem.path'/>
    </div>
    <div class="photo-container">
      <div v-for="photo in photos" :key="photo.id" class="photoshow">
        <photo-entry :photo="photo"/>
        <button @click="deletePhoto(photo)">DELETE PHOTO</button>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import PhotoEntry from '../components/PhotoEntry.vue'

export default {
  data() {
    return {
      title: "",
      description: "",
      file: null,
      url: "",
      addItem: null,
      photos: [],
    }
  },
  components: {
    PhotoEntry
  },
  created() {
    this.getPhotos();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async upload() {
      try {
        const formData = new FormData();
        console.log(this.description, " is the current description");
        formData.append('photo', this.file, this.file.name);
        formData.append('title', this.title);
        formData.append('description', this.description);
        await axios.post('api/photos', formData);
      } catch (error) {
        console.log(error);
      }
    },
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos");
        this.photos = response.data;
        console.log(response.data);
      } catch(error) {
        console.log(error);
      }
    },
    async deletePhoto(photo) {
      try {
        await axios.delete("api/photo/" + photo._id);
        this.getPhotos();
      } catch(error) {
        console.log(error);
      }
    },
    async editPhoto(photo) {
      try {
        await axios.put("api/photo/" + photo._id);
        //more efficient way to do this?
        this.getPhotos();
      } catch(error) {
        console.log(error);
      }
    }
  },
}
</script>

<style scoped>

.photo-container {
  display: flex;
  width: 100%;
  align-content: center;
  justify-content: center;
}

.photoshow {
  display: flex;
  width: 60%;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
</style>