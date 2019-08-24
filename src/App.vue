<template>
  <div id="app">
    <div class="background"></div>
    <router-view />
    <div class="footer">
      Photo from
      <b>
        <a
          class="unsplash"
          target="_blank"
          href="https://unsplash.com/photos/1h2Pg97SXfA"
          >UNSPLASH</a
        >
      </b>
    </div>
  </div>
</template>

<style lang="scss">
$primary_color: #fafafa;
$secondary_color: "#d3d3d3";
.unsplash {
  color: $primary_color;
  &:hover {
    color: $primary_color;
  }
}
.footer {
  position: fixed;
  height: 30px;
  bottom: 0;
  left: 0;
  right: 0;
}

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
