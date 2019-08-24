<template>
  <div class="app">
    <router-link class="link" :to="{ name: 'home' }"
      ><div class="AirApp">
        <img src="/image/cloud.png" /><b>AirApp</b>
      </div></router-link
    >
    <div class="error" v-if="error == true">{{ errormessage }}</div>
    <div class="info" v-if="error == false">
      <div class="date">
        <b>Date:</b> {{ data.list[0].dt | moment("DD.MM.YYYY") }}
      </div>
      <div class="location">
        <b>Location:</b> {{ data.city.name }}, {{ data.city.country }}
      </div>
    </div>
    <div class="legend" v-if="error == false">
      <div class="column"><b>Hour</b></div>
      <div class="column"><b>Temperature</b></div>
      <div class="column"><b>Description</b></div>
    </div>
    <!-- for wyswietlajacy liste temperatur  -->
    <div
      v-for="(list, index) in data.list"
      :key="index"
      class="hourly"
      v-if="error == false"
    >
      <div class="column">{{ list.dt | moment("HH:mm") }}</div>
      <div class="column">{{ Math.round(list.main.temp) }} °C</div>
      <div class="column">{{ list.weather[0].description }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      city: this.$route.query.city,
      data: {},
      error: false,
      errormessage: ""
    };
  },
  mounted() {
    document.title = "AirApp - " + this.city;
    //zapytanie do api
    this.$http
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&cnt=6&mode=json&APPID=831062d6e8b081d6572a60459e1c793e`
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
  }
};
</script>
<style lang="scss" scoped>
.link {
  color: #fafafa;
  text-decoration: none;
  &:hover {
    color: #fafafa;
  }
}
.legend {
  font-size: 1.2em;
  .column {
    display: inline-block;
    width: 190px;
    height: 60px;
    line-height: 90px;
    margin: 10px 10px 0 10px;

    &:first-child {
      margin: 10px 5px 0 0;
    }
    &:nth-child(3) {
      margin: 10px 0 0 5px;
    }
  }
}
.hourly {
  font-size: 1.2em;
  .column {
    display: inline-block;
    width: 190px;
    height: 60px;
    line-height: 60px;
    margin: 10px 10px 0 10px;
    background-color: hsla(0, 0%, 75%, 0.315);
    &:nth-child(3n -2) {
      margin: 10px 5px 0 0;
    }
    &:nth-child(3n + 0) {
      margin: 10px 0 0 5px;
    }
  }
}
.error {
  background-color: hsla(0, 0%, 75%, 0.315);
  height: 200px;
  font-size: 5em;
  line-height: 200px;
  margin-top: 50px;
}
.info {
  background-color: hsla(0, 0%, 75%, 0.315);

  font-size: 1.1em;
  margin: 15px 0 15px 0;
  padding: 10px;
  .date {
    display: inline-block;
    padding: 10px 50px 10px 0px;
  }
  .location {
    display: inline-block;
    padding: 10px 10px 10px 50px;
  }
}
.app {
  width: 600px;
  margin: auto;
}
.AirApp {
  text-align: left;
  padding-top: 5vh;
  font-size: 2.5em;
  font-family: "Averia Sans Libre", cursive;
  img {
    height: 40px;
  }
}
</style>
