<template>
  <div>
    <div class="form">
      <input v-model='name' placeholder='Name'>
      <br/>
      <label>Name</label>
      <p></p>
      <textarea v-model='content' placeholder='Journal Entry' rows='3' cols='70'></textarea>
      <p></p>
      <button v-on:click='getDate()' @click='upload()'>Upload</button>
      <button v-on:click='getAllJournals()'>Get</button>
    </div>

    <br/>

    <div class='journalContainer' v-for='journal in journals' :key='journal._id'>
      <JournalEntry :name='journal.name' :content='journal.content' :date='journal.date'/>
      <p></p>
      <button v-on:click='deleteJournal(journal)' @click='getAllJournals()'>Delete</button>
      <button v-on:click='edit(journal)' @click='getAllJournals()'>Edit</button>
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
      findItem: null,
      currEntry: null,
    }
  },

  created() {
    this.getAllJournals();
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

      //Resets data
      this.name = ''
      this.content = ''
      this.date = ''

      this.journals = this.getAllJournals()
    },


    async getAllJournals() {
      try {
        let allJournals = await axios.get('/api/entries')
        if (allJournals.length === 0) {
          this.journals = null;
        } else {
          this.journals = allJournals.data;
          console.log(this.journals)
        }
      } catch (error) {
        console.log(error)
      }
    },

    async deleteJournal(item) {
      try {
        await axios.delete('/api/entries/' + item._id);
      } catch (error) {
        console.log(error)
      }
    },

    async edit(item) {
      try {
        await axios.put('/api/entries/' + item._id)

      } catch (error) {
        console.log(error)
      }
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