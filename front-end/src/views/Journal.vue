<template>
  <div>
    <div class="form">
      <input v-model='name' placeholder='Name'>
      <p>{{name}}</p> <!--Testing-->
      <br/>
      <label>Name</label>
      <p></p>
      <textarea v-model='content' placeholder='Journal Entry' rows='3' cols='70'></textarea>
      <p>{{content}}</p> <!--Testing-->
      <p></p>
      <button v-on:click='getDate()'>Get Date</button>
      <button @click='upload()'>Upload</button>
    </div>

    <br/>
    <div class='journalContainer'>  <!--Make a v-for to iterate through journals array-->
      <JournalEntry :name='name' :content='content' :date='date'/>
    </div>
  </div>



</template>

<script>
import axios from 'axios';
import JournalEntry from '../components/JournalEntry.vue';

export default {
  name: 'Journal',

  data() {
    return {
      journals: [],
      name: '',
      content: '',
      date: '',
      currEntry: null,
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
      console.log("tryna upload");
      try {
        let journalEntry = await axios.post('/api/entries', {
        name: this.name,
        content: this.content,
        date: this.date,
      })
      this.currEntry = journalEntry;
      console.log(journalEntry);

      } catch (error) {
        console.log(error)
      }
    },


    async getAllJournals() {
      try {
        let allJournals = await axios.get('/api/entries')
        if (allJournals.length === 0) {
          this.journals = null;
        } else {
          this.journals = allJournals;
        }
      } catch (error) {
        console.log(error)
      }
    },


    
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