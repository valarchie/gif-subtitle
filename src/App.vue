<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ElRow } from 'element-plus'
import {ElCarousel} from 'element-plus'
import config from "./config/config"
</script>

<template>
  <el-row>
    <el-col :span="24">
      <div class="demo-image" >
        <div v-for="image in gifConfig" :key="image.id" class="block" @click='selectGif(image.id)'>
          <span class="demonstration">{{ image.title }}</span>
          <el-image style="width: 100px; height: 100px" :src="image.url" fit="fill" />
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8"><div class="grid-content bg-purple gallery slow-motion">
      <span class="demonstration">{{ currentGif.title }}</span>
      <el-image style="width: 80%; height: 80%" :src="currentGif.url" fit="fill" />
    </div>
    </el-col>
    <el-col :span="8"><div class="grid-content bg-purple-light gallery" /></el-col>
    <el-col :span="8"><div class="grid-content bg-purple gallery" /></el-col>
  </el-row>

  <el-row>
    <el-col :span="8" :offset="8">
        <el-button type="primary"> Element UI 11</el-button>
    </el-col>
  </el-row>

  <HelloWorld msg="Hello Vue 3 + Vite" />


</template>

<script>

export default {
  name: 'MyApp',
  data() {
    return {
      gifConfig : config.gifConfig,
      currentGif: {},
    }
  },
  methods: {
    selectGif(id) {
      this.currentGif = this.gifConfig.find(gif => gif.id === id);
      console.log(this.currentGif.title);
    },
  },
  // components: {/////////////////////
  //   'my-search': Search,
  // },
}/////////


</script>

<style style="scss">

.el-row {
  margin-top: 50px;
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  text-align: center;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}

.gallery {
  height: 400px;
}

.slow-motion {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 10%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}


</style>
