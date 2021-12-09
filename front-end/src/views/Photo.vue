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

  </div>

</template>

<script>
import axios from 'axios'

export default {

  data() {
    return {
      title: "",
      description: "",
      file: null,
      url: "",
      addItem: null,
    }
  },

  methods: {

    fileChanged(event) {
      this.file = event.target.files[0]
    },


    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        formData.append('title', this.title);
        formData.append('description', this.description);
        await axios.post("/api/photos", formData);
        this.file = null;
        this.url = "";
        this.title = "";
        this.description = "";
        this.$emit('uploadFinished');
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    },


    //Testing

    async delete(photo) {
      try {
        await axios.delete('/api/photos/' + photo._id);
        return true;
      } catch (error) {
          console.log(error);
        }
    },

  },


}
</script>
