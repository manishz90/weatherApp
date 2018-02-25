(function () {
 var app = new Vue({
      el: '#vueApp',
      data: {
        city: '',
        output: {},
        recognition: {}
      },
      methods: {
        getWeatherInfo: function () {
            if (this.$data.city) {
                 var url = '/get_weather_info?city=' + this.$data.city;
                $.get(url, (data, status) =>{
                    console.log(data);
                    this.$data.output = data;
                    this.$data.city = '';
                });
            }
        },
        registerSpeechRecogination : () => {
              if (('webkitSpeechRecognition' in window)) {
                    this.recognition = new webkitSpeechRecognition();
                    this.recognition.lang = "en-US";
                }
                this.recognition.onstart = function() {
                    console.log('Speech recognition service has started');
                };

                this.recognition.onresult = function(event) {
                    var final_transcript = '';
                    var resultArray = event.results[0][0].transcript.split(' ');
                    if (resultArray[0]) {
                        app.$data.city = resultArray[0];
                        app.getWeatherInfo();    
                    }
                };
                this.recognition.onerror = function(event) {
                    console.error(event);
                };
                this.recognition.onend = function() {
                    console.log('Speech recognition service disconnected');
                };
        },
        speechRecoginationStart :  () => {
            this.recognition.start();
        }
    }
});

app.registerSpeechRecogination();
} ())    