<template>
  <div>
    <div class='reviewContainer'>
      <div class='name'>
        <span>{{name}}</span>
        <!--<input class='edit' v-model='newName' placeholder='Name'>-->
      </div>
      <div class='content'>
        <p>{{content}}</p>
        <!--<textarea class='edit' v-model='newContent' placeholder='Journal Entry' rows='3' cols='70'></textarea>-->
      </div>
      <div class='date'>
        <span>Posted: {{date}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'JournalEntry',

  props: {
    name: String,
    content: String,
    date: String,
  },

  data() {
    return {
      newName: '',
      newContent: '',
      newDate: '',
    }
  },


}

</script>

<style scoped>

.reviewContainer {
  display: flex;
  background-color: lightblue;
  width: 700px;
  border: 2px solid black;
  flex-direction: column;
}

.name {
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  height:auto;
}

.date {
  display: flex;
}

textarea {
  height: auto;
}

.edit {
  background-color: lightblue;
  width: 100%;
  border: none;

}

</style>;