var Vue = require('vue')
var App = require('./app.vue')

const app = new Vue({
  el: '#app',
  render: function (createElement) {
    return createElement(App)
  }
})

//app.registerSpeechRecogination();
