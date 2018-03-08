// comp.vue
<style>
  .green {
    color: green;
  }
</style>

<template>
<div><h1 class="green">{{msg}}</h1></div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world! from component'
    }
  }
}
</script>
