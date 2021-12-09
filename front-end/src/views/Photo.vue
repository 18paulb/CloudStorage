<template>
  <div>
    <div class='form'>
      <form>
        <input type='text' v-model='title' placeholder='Title'>
      </form>
      <br/>
      <label>Photo Title</label>
      <p></p>

      <textarea v-model='description' placeholder='Description' rows='2' cols='50'></textarea>
      <p></p>
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
        <div class="buttons">
          <button class="function-button" @click="deletePhoto(photo)">DELETE PHOTO</button>
          <button class="function-button" @click="edit()">EDIT PHOTO</button>
        </div>
        <div v-if="editing" class="edit-submit">
          <form>
            <input type="text" placeholder="New Title" v-model="newTitle">
          </form>
          <textarea placeholder="New Description" v-model="newDescription"></textarea>
          <button class="function-button" @click="editPhoto(photo, newTitle, newDescription)">SUBMIT CHANGES</button>
          <button class="function-button" @click="cancelEdit()">CANCEL CHANGES</button>
        </div>
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
      newDescription: "",
      newTitle: "",
      file: null,
      url: "",
      editing: false,
      addItem: null,
      photos: [],
    }
  },
  components: {
    PhotoEntry
  },
  created() {
    this.getPhotos();
    this.editing = false;
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        formData.append('title', this.title);
        formData.append('description', this.description);
        await axios.post('api/photos', formData);
        this.getPhotos();
      } catch (error) {
        console.log(error);
      }
    },
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos");
        this.photos = response.data;
        console.log(response.data);
        this.editing = false;
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
    async editPhoto(photo, title, description) {
      try {
        await axios.put("/api/photo/" + photo._id, {
          title: title,
          description: description
        });
        //more efficient way to do this?
        this.getPhotos();
        this.editing = false;
      } catch(error) {
        console.log(error);
      }
    },
    async cancelEdit() {
      newTitle = "";
      newDescription = "";
      this.getPhotos();
    },
    edit() {
      this.editing = true;
    }
  },
}
</script>

<style scoped>

.photo-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.photoshow {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.function-button {
  width: fit-content;
  padding: 12px;
  margin-left: 30px;
  margin-right: 30px;
}

.submit-edit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

textarea {
  width: 50%;
}
</style>