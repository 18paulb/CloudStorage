<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/journal">Journals</router-link> |
      <router-link to="/photo">Photos</router-link> |
    </div>
    <router-view />


    <div class="footer"> 
      <h2><a class="github-link" href="https://github.com/18paulb/CloudStorage">github</a></h2>
    </div>

  </div>
</template>

<style>

#footer {
  position: fixed;
  bottom: 0;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.footer {
  position: relative;
  bottom: 0;
  width: 98%;
  height: 2.5rem;
}

.github-link:hover {

  color: #42b983;
}


</style>



