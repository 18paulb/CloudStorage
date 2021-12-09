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
    </div>


    <br/>

    <div class='journalContainer'>
      <div class='journal' v-for='journal in journals' :key='journal._id'>
        <JournalEntry :name='journal.name' :content='journal.content' :date='journal.date'/>
        <br/>
        <!--
        <div>
          <button v-on:click='deleteJournal(journal)' @click='getAllJournals()'>Delete</button>
          <button v-on:click='edit(journal)' @click='getAllJournals()'>Edit</button>
        </div>
        -->
        <div class="buttons">
          <button class="function-button" @click="deleteJournal(journal)" v-on:click='getAllJournals()'>DELETE JOURNAL</button>
          <button class="function-button" @click="edit()" v-on:click='getAllJournals()'>EDIT JOURNAL</button>
        </div>
        <div v-if="editing" class="edit-submit">
          <form>
            <input type="text" placeholder="New Name" v-model="journal.name">
          </form>
          <textarea placeholder="New Content" v-model="journal.content"></textarea>
          <button class="function-button" @click="editJournal(journal)" v-on:click='edit()'>SUBMIT CHANGES</button>
          <button class="function-button" @click="cancelEdit()" v-on:click='edit()'>CANCEL CHANGES</button>
        </div>

      </div>
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

      newName: '',
      newContent: '',
      editing: false,
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

//FIXME finish
    async editJournal(item) {
      try {
        await axios.put('/api/entries/' + item._id, {
          name: item.name,
          content: item.content,
          date: this.getDate(),
        })

      } catch (error) {
        console.log(error)
      }
    },

    edit() {
      if(this.editing == true)
        this.editing = false
      else
        this.editing = true;
    },

    async cancelEdit() {
      this.newTitle = "";
      this.newDescription = "";
      this.getAllJournals();
    },


    
  }
}
</script>


<style scoped>

.journalContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  /*border: 1px solid purple;*/
  flex-direction: column;
}

.journal {
  display: flex;
  justify-content: center;
  align-items: center;
  /*border: 3px solid green;*/
  flex-direction: column;
  margin-bottom: 100px;
}


.function-button {
  width: fit-content;
  padding: 12px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 20px;
  margin-top: 10px;
}

.edit-submit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: lightblue;
}
</style>