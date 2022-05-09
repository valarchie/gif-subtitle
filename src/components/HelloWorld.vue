<script>
import gifTools from '../utils/gifTools.js'

export default {

  name: "HelloWorld",
  data() {
    return {
      msg: " ",
      count: 0
    }
  },
  methods: {
    upload() {
      console.log("上传了图片");
      gifTools.readFile();
      gifTools.readGif();
    }

    
  },

  render: {


  }

}



</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>
  <img id="archie"/>

  <!-- <button type="button" @click="count++">count is: {{ count }}</button> -->
  <button type="button" @click="upload()">制作GIF</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
