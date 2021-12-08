<template>
  <div>
    <div class='form'>
      <input v-model='name' placeholder='Name'>
      <p>{{name}}</p> <!--Testing-->
      <br/>
      <label>Name</label>
      <p></p>
      <textarea v-model='content' placeholder='Journal Entry' rows='3' cols='70'></textarea>
      <p>{{content}}</p> <!--Testing-->
      <p></p>
      <button @click='upload' v-on:click='getDate()'>Upload</button>
    </div>
     
    <br/>

    <div class='journalContainer'>  <!--Make a v-for to iterate through journals array-->
      <JournalEntry :name='name' :content='content' :date='date'/>
    </div>

  </div>



</template>

<script>
//import axios from 'axios';
import JournalEntry from '../components/JournalEntry.vue';

export default {
  name: 'Journal',

  data() {
    return {
      journals: [],
      name: '',
      content: '',
      date: '',
    }
  },

  components: {
    JournalEntry,
  },

  methods: {

    getDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
      this.date = today;
    },

    async upload() {
      
    }
    
  }
}
</script>


<style scoped>

.journalContainer {
  display: flex;
  justify-content: center;
  align-content: center;
  border: 1px solid purple;
}
</style>