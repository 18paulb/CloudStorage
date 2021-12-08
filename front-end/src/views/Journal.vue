<template>
  <div>
    <div class='form'>
      <input v-model='title' placeholder='Name'>
      <br/>
      <label>Name</label>
      <p></p>
      <textarea v-model='description' placeholder='Journal Entry' rows='3' cols='70'></textarea>
      <p></p>
      <button @click='upload'>Upload</button>
    </div>
    <div class='upload' v-if='addItem'>
      <h2>{{addItem.title}}</h2>
      <img :src='addItem.path'/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import JournalEntry from '../components/JournalEntry.vue';

export default {
  name: 'Journal',
  components: {
    JournalEntry
  },
  methods: {
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
    }
  }
}
</script>

