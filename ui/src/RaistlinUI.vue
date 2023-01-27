<template>
  <div id="raistlinUI">
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
          style=""
          href="/"
        >
          Raistlin
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
      >
        <div class="navbar-start">
          <router-link
            to="/tasks"
            class="navbar-item r-item"
          >
            Tasks
          </router-link>
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

    <router-view />
    <div class="footer">
      <div class="content has-text-centered" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RaistlinUI',
};
</script>

<style lang="scss">
@import 'sass/style.scss';

html {
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  position: relative;
  margin: 0;
  padding-bottom: 6rem;
  min-height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;

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

.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #d16a00 !important;
  color: white !important;
  text-align: center;
}

#raistlinUI {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
