<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ElRow } from 'element-plus'
import { ElCarousel } from 'element-plus'
import { ElInput } from 'element-plus'
import config from './config/config'
import gifTools from './utils/gifTools.js'
</script>

<template>
  <el-row>
    <el-col :span="24">
      <div class="demo-image">
        <div v-for="image in gifConfig" :key="image.id" class="block" @click="selectGif(image.id)">
          <span class="demonstration">{{ image.title }}</span>
          <el-image style="width: 100px; height: 100px" :src="image.url" fit="fill" />
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row class>
    <el-col :span="8">
      <div class="grid-content bg-purple gallery slow-motion">
        <span class="demonstration">{{ currentGif.title }}</span>
        <el-image style="width: 80%; height: 80%" :src="currentGif.url" fit="fill" />
      </div>
    </el-col>
    <el-col :span="8" class="subtitle-box">
      <div class="grid-content bg-purple-light gallery">
        <el-row v-for="(subtitle, index) in subtitles" :key="index">
          <el-col :span="16">
            <el-input v-model="subtitle.text" class="w-50 m-2" size="large" placeholder="Subtitle" />
          </el-col>
          <el-col :span="4">
            <el-input v-model="subtitle.startFrameIndex" class="w-50 m-2" size="large" placeholder="Start Frame" />
          </el-col>
          <el-col :span="4">
            <el-input v-model="subtitle.endFrameIndex" class="w-50 m-2" size="large" placeholder="End Frame" />
          </el-col>
        </el-row>
        <el-button type="primary" @click="addSubtitle">Add Subtitle</el-button>
        <el-button type="warning" @click="removeSubtitle">Remove Subtitle</el-button>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple gallery slow-motion">
        <span class="demonstration">{{ currentGif.title }}</span>
        <el-image style="width: 80%; height: 80%" :src="renderedGif.url" fit="fill" />
      </div>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="8" :offset="8">
      <el-button id="createButton" type="primary" size="large" @click="createGifWithSubtitle()">Create GIF with Subtitle</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'MyApp',
  data() {
    return {
      gifConfig: config.gifConfig,
      currentGif: {},
      renderedGif: {},
      subtitles: [{}, {}, {}]
    }
  },
  methods: {
    selectGif(id) {
      let selectedGif = this.gifConfig.find(gif => gif.id === id)
      this.currentGif = {
        url: selectedGif.url,
        id: selectedGif.id
      }
      console.log(this.currentGif.url)
      gifTools.renderGifWithSubtitle(this.currentGif.url, null, null, true, this.currentGif)
    },

    addSubtitle() {
      this.subtitles.push({})
    },
    removeSubtitle() {
      this.subtitles.pop()
    },

    createGifWithSubtitle() {
      let selectedGif = this.gifConfig.find(gif => gif.id === this.currentGif.id)
      if (!selectedGif.url) {
        alert('please select one GIF to add subtitles.')
      }

      gifTools.renderGifWithSubtitle(selectedGif.url, this.subtitles, null, false, this.renderedGif)
    }
  }
}
</script>

<style style="scss">
#createButton {
  margin-top: 30px;
}

.el-row .el-col .demo-image {
  margin-top: 30px;
  margin-bottom: 30px;
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

.el-input {
  display: inline-block;
}

.subtitles {
  display: inline-block;
}

.subtitle-box .el-row {
  margin-bottom: 20px;
  padding: 0 50px;
}
</style>
