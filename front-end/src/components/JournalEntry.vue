<template>
  <div>
    <div class='reviewContainer'>
      <div class='name'>
        <p>{{name}}</p>
      </div>
      <div class='content'>
        <p>{{content}}</p>
      </div>
      <div class='date'>
        <p>{{date}}</p>
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
  width: 500px;
  border: 2px solid orange;
  flex-direction: column;
}

.name {
  display: flex;
  border: 2px solid lightcoral;
}

.content {
  display: inline-block;
  border: 2px solid greenyellow;
  height:auto;
}

.date {
  display: flex;
  border: 2px solid black;
}

</style>