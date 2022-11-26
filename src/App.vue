<template>
    <div class="scene">
      <MCard
          v-for="index in 9"
          :key="index"
          :style="{ top: `${(CARD_HEIGHT + 10) * ((index + 1) % 3) + 50}px`, left: `${(CARD_WIDTH + 10) * Math.ceil((index) / 3)}px` }"
          :front-image="require('@/assets/gloom.png')"
          :back-image="require('@/assets/back.jpg')"
          :open-close-animation-duration="500"
      />
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MCard from '@/components/MCard.vue'

const CARD_WIDTH = 200
const CARD_HEIGHT = 300

export default defineComponent({
  name: 'App',
  components: {
    MCard
  },
  setup () {
    return {
      CARD_WIDTH,
      CARD_HEIGHT
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
  position: absolute;
  transform-style: preserve-3d;
}

.scene {
  width: 50em;
  height: 50em;
  top: 50%;
  left: 50%;
  margin: -25em 0 0 -25em;
  background-color: #809a80;
}
</style>
