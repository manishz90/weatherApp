"use strict";!function(){var t=new Vue({el:"#vueApp",data:{city:"",output:{},recognition:{},loading:!1},methods:{getWeatherInfo:function(){var t=this;if(this.$data.city){this.$data.loading=!0;var i="/get_weather_info?city="+this.$data.city;$.get(i,function(i,n){console.log(i),t.$data.output=i,t.$data.city="",t.$data.loading=!1})}else this.$data.loading=!1},registerSpeechRecogination:function(){"webkitSpeechRecognition"in window&&(this.recognition=new webkitSpeechRecognition,this.recognition.lang="en-US"),this.recognition.onstart=function(){console.log("Speech recognition service has started")},this.recognition.onresult=function(i){var n=i.results[0][0].transcript.split(" ");n[0]&&(t.$data.city=n[0],t.$data.loading=!0,t.getWeatherInfo())},this.recognition.onerror=function(t){console.error(t)},this.recognition.onend=function(){console.log("Speech recognition service disconnected")}},speechRecoginationStart:function(){this.recognition.start()}}});t.registerSpeechRecogination()}();