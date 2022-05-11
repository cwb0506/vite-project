<template>
  <div>
	  <headers level="2">hello world</headers>
	  <img :src="url" alt=""><br>
    <el-button @click="clearAnimate();animate()">开始动画</el-button>
    <el-button @click="stopAnimate">暂停动画</el-button>
    <el-button @click="continueAnimate">继续动画</el-button>
    <el-button @click="clearAnimate">清除动画</el-button>
  </div>
</template>
<script setup>
import headers from '../components/header'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
let images = []
let timer = null
let index = ref(0) // 动画帧
let url = ref('')
let currentIdx = 0 // 当前帧
onMounted(() => {
  loadAll()
})
// 预加载单帧图片
function loadImage (i) {
	return new Promise((resolve) => {
    const img = new Image()
    // vue3中需要这样引用本地图片
    img.src = new URL(`../assets/bdc0547feeee21b524a60e6d68f2012f-${i}.png`, import.meta.url).href
    img.onload = () => {
      resolve(img.src)
    }
	})
}
// 所以图片加载完成
function loadAll () {
	const list = []
	for(let i = 1; i < 125; i++) {
	  list.push(loadImage(i))
	}
	Promise.all(list).then(res => {
    images = res
    url.value = res[0]
	})
}
// 暂停动画
function stopAnimate () {
  clearInterval(timer)
  currentIdx = index.value
}
// 继续动画
function continueAnimate () {
  clearInterval(timer)
  index.value = currentIdx
  animate()
}
// 开始动画
function animate () {
	const list = images
	timer = setInterval(() => {
    if (index.value >= list.length - 1) {
      clearInterval(timer)
      currentIdx = 0
      ElMessage.success('啊，躺平真舒服！')
    } else {
      url.value = list[index.value]
      index.value++
    }
  }, 20)
}
// 清除动画
function clearAnimate () {
  url.value = images[0]
  currentIdx = 0
  index.value = 0
  clearInterval(timer)
}
</script>
<style>
</style>