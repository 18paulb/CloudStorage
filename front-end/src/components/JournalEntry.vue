<template>
  <div>
    <div class='reviewContainer'>
      <div class='name'>
        <!--<p>{{name}}</p> -->
        <input class='edit' v-model='name' placeholder='Name'>
      </div>
      <div class='content'>
        <!--<p>{{content}}</p>-->
        <textarea class='edit' v-model='content' placeholder='Journal Entry' rows='3' cols='70'></textarea>
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

  methods: {

  },

}

</script>

<style scoped>

.reviewContainer {
  display: flex;
  background-color: lightblue;
  width: 100%;
  border: 2px solid orange;
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

.edit {
  background-color: lightblue;
  width: 100%;
  border: none;
}

</style>;