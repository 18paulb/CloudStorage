<template>
  <div class="content">\
    <h2>TITLE: {{photo.title}} ID:{{photo.id}} DATE: {{photo.created}}</h2>
    <img :src="photo.path"/>
  </div>
</template>

<script>

export default {
  name: "PhotoEntry",
  props: {
    photo: Object
  },
  methods: {
    
  }
}
</script>

<style scoped>
.content {
  display: flex;
  width: 100%;
  align-content: center;
  flex-direction: column;
}
img {
  width: 60%;
}
</style>
