<template>
  <div>
    <div class='form'>
      <input v-model='title' placeholder='Title'>
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
  </div>

</template>

<script>
//import axios from 'axios'

export default {

  data() {
    return {
    }
  },

  methods: {

  },


}
</script>
