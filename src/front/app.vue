// app.vue
<style>
  .red {
    color: #f00;
  }
</style>

<template>
<div class="container-fluid">
      <input type="text" id="enter_city" v-model='city' placeholder="Type-in a city name..."
             class="col-xs-12 col-sm-12 col-md-4 col-lg-4"
             v-on:keyup.enter="getWeatherInfo" style="background-color: lightyellow; margin-right:2px" autofocus>
      <a href="#" class="fa fa-search" style="font-size:2em;" v-on:click="getWeatherInfo" v-bind:disabled="city">
      </a>
      <a href="#" class="fa fa-microphone" v-on:click="registerSpeechRecogination();speechRecoginationStart()"
         style="font-size:2em;margin-bottom: 1.75em"></a>
    <div class="row loader" v-if="loading"></div>
    <div class="row text-left" style="margin-top:20px" v-if="output.message && loading !== true">
        <h2>{{output.message}}</h2>
    </div>
    <div class="row row-list text-left" v-if="output.formattedAddress && loading !== true">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-top:-25px">
            <h3>{{output.formattedAddress}}</h3>
            <h1 class="fa fa-thermometer-half" style="font-size:3em;"> : {{Math.round( output.temp * 10 ) / 10}}&#8457; /
                <span>{{(Math.round((output.temp - 32) * 5/9)/10)}}&#8451;
                </span>
            </h1>
            <div style="margin-bottom: 1em">
                <h5> - Yeah, it feels like: {{Math.round(output.apparentTemperature * 10) / 10}}&#8457; /
                    <span>{{(Math.round((output.apparentTemperature - 32) * 5/9)/10)}}&#8451;
                    </span>
                </h5>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <table class="table table-bordered">
                <thead class="text-center">
                  <tr>
                    <th class="text-center">Weather parameter</th>
                    <th class="text-center">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Humidity</td>
                    <td>{{output.humidity}}</td>
                  </tr>
                  <tr>
                    <td>Pressure</td>
                    <td>{{output.pressure}}</td>
                  </tr>
                  <tr>
                    <td>Wind speed</td>
                    <td>{{output.windSpeed}}</td>
                  </tr>
                    <tr>
                    <td>Cloud cover</td>
                    <td>{{output.cloudCover}}</td>
                  </tr>
                  <tr>
                    <td>UV index</td>
                    <td>{{output.uvIndex}}</td>
                  </tr>
                  <tr>
                    <td>Ozone</td>
                    <td>{{output.ozone}}</td>
                  </tr>
                </tbody>
            </table>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <table class="table table-bordered">
                <thead class="text-center">
                  <tr>
                    <th class="text-center">Weather Parameter</th>
                    <th class="text-center">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Precipitation Probability</td>
                    <td>{{output.precipProbability}}</td>
                  </tr>
                  <tr>
                    <td>Precipitation Type</td>
                    <td>{{output.precipType}}</td>
                  </tr>
                  <tr>
                    <td>Precipitation Accumulation</td>
                    <td>{{output.precipAccumulation}}</td>
                  </tr>
                    <tr>
                    <td>Visibility</td>
                    <td>{{output.visibility}}</td>
                  </tr>
                  <tr>
                    <td>Nearest Storm Distance</td>
                    <td>{{output.nearestStormDistance}}</td>
                  </tr>
                  <tr>
                    <td>Nearest Storm Bearing</td>
                    <td>{{output.nearestStormBearing}}</td>
                  </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="row" v-if="output.summary && loading !== true">
        <div class="text-left col-xs-12" style="margin-top:1.5empx">
            <h2>{{output.summary}}</h2>
        </div>
    </div>
</div>
</template>

<script>
var comp = require('./comp.vue')
export default {
  data: function () {
  return {
  city: '',
  output: {},
  recognition: {},
  loading: false
  }
  },
  methods: {
    getWeatherInfo: function () {
        if (this.$data.city) {
             this.$data.loading = true;
             var url = '/get_weather_info?city=' + this.$data.city;
            $.get(url, (data, status) =>{
                console.log(data);
                this.$data.output = data;
                this.$data.city = '';
                this.$data.loading = false;
            });
        } else {
            this.$data.loading = false;
        }
    },
    registerSpeechRecogination : function () {
          if (('webkitSpeechRecognition' in window)) {
                this.recognition = new webkitSpeechRecognition();
                this.recognition.lang = "en-US";
            }
            this.recognition.onstart = function() {
                console.log('Speech recognition service has started');
            };

            this.recognition.onresult = (event) => {
                var final_transcript = '';
                var resultArray = event.results[0][0].transcript.split(' ');
                if (resultArray[0]) {
                    console.log("Start", this);
                    this.$data.city = resultArray[0];
                    this.$data.loading = true;
                    this.getWeatherInfo();
                }
            };
            this.recognition.onerror = function(event) {
                console.error(event);
            };
            this.recognition.onend = function() {
                console.log('Speech recognition service disconnected');
            };
    },
    speechRecoginationStart : function () {
        this.recognition.start();
        }
    },
  components : {
    comp: comp
  }
}
</script>
