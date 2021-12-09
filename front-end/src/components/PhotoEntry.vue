<template>
  <div class="content">
    <h2>{{photo.title}}, from {{formatDate(photo.created)}}</h2>
    <div class="img-contain">
      <img :src="photo.path"/>
    </div>
    <br>
    <p>{{photo.description}}</p>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: "PhotoEntry",
  props: {
    photo: Object
  },
  methods: {
    formatDate(date) {
        return moment(date).format('d MMMM YYYY');
    },
  }
}
</script>

<style scoped>
.content {
  display: flex;
  width: 100%;
  align-content: center;
  flex-direction: column;
  justify-content: center;
}
img {
  width: 40%;
}
</style>
