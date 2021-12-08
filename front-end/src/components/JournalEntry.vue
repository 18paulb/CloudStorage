<template>
  <div>
    <div class='reviewContainer'>
      <div class='name'>
        <p>Name: {{name}}</p>
      </div>
      <div class='content'>
        <p>Content: {{content}}</p>
      </div>
      <div class='date'>
        <p>Date: {{date}}</p>
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
  display: flex;
  border: 2px solid greenyellow;
}

.date {
  display: flex;
  border: 2px solid black;
}

</style>