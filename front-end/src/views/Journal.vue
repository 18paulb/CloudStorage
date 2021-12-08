<template>
  <div>
    <div class='form'>
      <input v-model='title' placeholder='Name'>
      <br/>
      <label>Name</label>
      <p></p>
      <textarea v-model='description' placeholder='Journal Entry' rows='3' cols='70'></textarea>
      <p></p>
      <button @click='upload'>Upload</button>
    </div>
    <div class='upload' v-if='addItem'>
      <h2>{{addItem.title}}</h2>
      <img :src='addItem.path'/>
    </div>
  </div>
</template>
