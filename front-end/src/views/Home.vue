<template>
  <div>
    <h1>Welcome To Your Cloud Storage!</h1>
    <h4>We provide a variety of services including uploading and storing photos and journal entries!</h4>

    <h1>Examples!</h1>

    <div class='journalContainer'>
      <div class='journal'>
        <JournalEntry :name='journalName' :content='journalContent' :date='date'/>
      </div>
    </div>

    <div class="photo-container">
      <div class="photoshow">
        <div class="content">
          <h2>{{photoTitle}}, 4 December 2021 </h2>
          <div class="img-contain">
            <img src='../../public/images/revolver.jpeg'/>
          </div>
          <br>
          <p>{{photoDescription}}</p>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src
//THIS PAGE HAS PHOTO EXAMPLES
import JournalEntry from '../components/JournalEntry.vue'
//import PhotoEntry from '../components/PhotoEntry.vue'

export default {
  data() {
    return {
      journalName: "Bob Parr",
      journalContent: "I went to work and ate cake",
      date: '9/12/1999',
      photo: '../../public/images/revolver.jpeg',
      photoTitle: 'Revolver',
      photoDescription: 'An album made by the Beatles',
    }
  },



  components: {
    JournalEntry,
    //PhotoEntry
  },

  methods: {

  }


};



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

.content {
  display: flex;
  width: 100%;
  align-content: center;
  flex-direction: column;
  justify-content: center;
}

img {
  width: 50%;
}

</style>