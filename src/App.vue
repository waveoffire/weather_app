<template>
  <div id="app">
    <div class="background"></div>
    <router-view />
  </div>
</template>

<style lang="scss">
$primary_color: #fafafa;
$secondary_color: "#d3d3d3";
div.background {
  background-image: url("/image/background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(1.5px) brightness(70%);
  -webkit-filter: blur(1.5px) brightness(70%);
  position: fixed;
  left: -5px;
  right: -5px;
  z-index: -1;
  top: -5px;
  bottom: -5px;
}
body {
  font-family: "Livvic", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $primary_color;
  text-align: center;
}
</style>
