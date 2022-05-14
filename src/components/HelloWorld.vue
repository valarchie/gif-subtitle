<script>
import gifTools from '../utils/gifTools.js'
import { ElRow } from 'element-plus'

export default {

  name: "HelloWorld1",
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

  <img id="archie"/>

  <!-- <button type="button" @click="count++">count is: {{ count }}</button> -->
  <button type="button" @click="upload()">制作GIF</button>
  <el-button type="primary"> Element UI </el-button>
  

</template>

<style scoped>
a {
  color: #42b983;
}
</style>
