<template>
  <div id="raistlinFront">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">

        <a class="navbar-item" style="" href="/">
            <img src="https://i0.wp.com/blog.bitergia.com/wp-content/uploads/2019/02/bitergia-owl-big.png?fit=313%2C310&ssl=1" width="28" height="28">
          Raistlin
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/tasks" class="navbar-item r-item">Tasks</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary navbar-button">
                <strong>Log in</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view/>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Bitergia&copy; - All rights reserved
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'RaistlinFront'
}
</script>

<style>
html {
    height: 100%;
    overflow-y:hidden
}

body {
    min-height: 100%;
}

.navbar {
    background-color: #383838
}
.navbar a:hover {
    color: gray
}
.navbar-brand a {
    color: white;
    font-weight: bold
}
.navbar-start a {
    color: white;
    padding: 0.5rem 1.75rem
}
.navbar-button {
    background-color: #d16a00 !important
}
.navbar-button:hover {
    background-color: #bb5f00 !important
}
.navbar-active {
    color: gray !important;
    background-color: white !important
}

body::after {
  content: '';
  display: block;
  height: 50px; /* Set same as footer's height */
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #d16a00 !important;
  color: white !important
}


#raistlinFront {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
