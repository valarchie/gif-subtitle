<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: ' '
    }
  },
  methods: {
    test() {
      console.log('testing')
    }
  }
}
</script>
<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
