<template>
  <div class="scene">
    <div class="scene-grid">
    <MCard
        v-for="index in 9"
        :key="index"
        :front-image="face"
        :back-image="back"
        :width="CARD_WIDTH"
        :height="CARD_HEIGHT"
        :open-close-animation-duration="500"
        enabled
    />
  </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MCard from '@/components/MCard.vue'

const CARD_WIDTH = 150
const CARD_HEIGHT = 250

import face from '@/assets/gloom.png'
import back from '@/assets/back.jpg'

export default defineComponent({
  name: 'App',
  components: {
    MCard
  },
  setup () {
    return {
      CARD_WIDTH,
      CARD_HEIGHT,
      face,
      back
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  /* 3D */
  perspective: 1000px;

  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: transparent;
  font-size: 100%;
}

.scene {
  width: 100%;
  height: 100%;
  background-color: #809a80;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scene-grid {
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;

  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(3, 150px);
  grid-template-rows: repeat(3, 250px);
}
</style>
