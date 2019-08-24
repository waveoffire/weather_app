
<template>
  <div class="home">
    <div class="AirApp"><img src="/image/cloud.png" /><b> AirApp</b></div>
    <div class="description">
      Check the weather! Enter the city name, or
      <b>leave empty for geolocation</b>
    </div>
    <div class="search">
      <input type="text" v-model="city" /><button
        class="check"
        @click="check()"
      >
        CHECK
      </button>
    </div>
    <div class="homeTemp">
      <div v-if="data.name" class="degrees">
        {{ Math.round(data.main.temp) }} °C
      </div>
      <div v-if="data.name" class="location">
        <p><b>Date:</b> 22.08.2019</p>
        <p><b>Location:</b> {{ data.name }}, {{ data.sys.country }}</p>
        <p><b>Description:</b> {{ data.weather[0].description }}</p>
      </div>
      <div v-if="data.name" class="more"><b @click="more()">MORE</b></div>
      <div v-else class="error">
        No data, accept localization please.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "",
      position: {},
      data: {}
    };
  },
  methods: {
    //pobiera lokalizacje i wysyła zapytanie do bazy danych
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.position = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          this.$http
            .get(
              `http://api.openweathermap.org/data/2.5/weather?lat=${this.position.latitude}&lon=${this.position.longitude}&units=metric&APPID=831062d6e8b081d6572a60459e1c793e`
            )
            .then(
              response => {
                this.data = response.body;
              },
              response => {
                this.error = true;
                this.errormessage = response.body.message;
              }
            );
        });
      }
      return this.position;
    },
    //przycisk CHECK - przejscie do podstrony deatails
    check() {
      this.$router.push({ name: "Details", query: { city: this.city } });
    },
    more() {
      this.$router.push({ name: "Details", query: { city: this.data.name } });
    }
  },
  mounted() {
    document.title = "AirApp";
    this.getLocation();
  }
};
</script>

<style lang="scss" scoped>
$primary_color: #fafafa;
$secondary_color: #d3d3d3;
.check {
  cursor: pointer;
}
.more {
  cursor: pointer;
}
.error {
  font-size: 2em;
  line-height: 150px;
}
.home {
  width: 600px;
  margin: auto;
}
.AirApp {
  padding-top: 25vh;
  font-size: 6em;
  font-family: "Averia Sans Libre", cursive;
  img {
    height: 80px;
  }
}
.description {
  color: $secondary_color;
  font-size: 1.3em;
}
.search {
  input {
    background-color: hsla(0, 0%, 100%, 0.122);
    border: 1px solid $secondary_color;
    height: 40px;
    width: 440px;
    box-sizing: border-box;
    padding: 10px;
    margin: 15px 10px 15px 0;

    color: $primary_color;
    font-size: 1.5em;
    &:focus {
      outline: none !important;
      box-shadow: 0 0 2px #ffffff;
    }
  }
  button {
    background-color: hsla(0, 0%, 100%, 0.623);
    border: 1px solid $secondary_color;
    height: 40px;
    width: 140px;
    box-sizing: border-box;
    color: $primary_color;
    font-size: 1.5em;
    margin-left: 10px;
    &:hover {
      outline: none !important;
      box-shadow: 0 0 2px #ffffff;
    }
    &:focus {
      outline: none !important;
      box-shadow: 0 0 2px #ffffff;
    }
  }
}
.homeTemp {
  background-color: hsla(0, 0%, 75%, 0.315);
  height: 150px;
  box-sizing: border-box;
  width: 600px;
  .degrees {
    font-family: "Averia Sans Libre", cursive;
    height: 150px;
    width: 200px;
    display: inline-block;
    padding-left: 15px;
    font-size: 4em;
    box-sizing: border-box;
    position: relative;
    top: -27px;
  }
  .location {
    height: 150px;
    width: 310px;
    display: inline-block;
    padding-left: 15px;
    text-align: left;
    box-sizing: border-box;
    font-size: 1.1em;
    padding-top: 7px;
  }
  .more {
    height: 20px;
    width: 50px;
    display: inline-block;
    box-sizing: border-box;
    font-size: 1.2em;
  }
}
</style>
