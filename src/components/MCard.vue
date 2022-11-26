<template>
  <div class="card-container" @click="cardClickHandler">

  <div class="shape cuboid-1 cub-1 card-rotate-outside">
    <div class="shape-body card-rotate">
      <div class="face ft">
        <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.15);"></div>
      </div>
      <div class="face bk">
        <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.15);"></div>
      </div>
    </div>
  </div>

  <div class="shade-rotate shade-element shade-blur shade-opacity">
  </div>

  </div>

</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, Ref } from 'vue'
import { easeInOutCubic } from '@/easing'

export default defineComponent({
  name: 'MCard',
  props: {
    initiallyOpened: Boolean,
    frontImage: String,
    backImage: String,
    sizeMetric: {
      type: String as PropType<'px' | 'em'>,
      default: () => 'px'
    },
    cornerRadius: {
      type: Number,
      default: () => 10
    },
    width: {
      type: Number,
      default: () => 200
    },
    height: {
      type: Number,
      default: () => 300
    },
    openCloseAnimationDuration: {
      type: Number,
      default: () => 800
    },
    holdAfterTurningDuration: {
      type: Number,
      default: () => 200
    },
    goBackDuration: {
      type: Number,
      default: () => 300
    }
  },
  setup (props) {
    const MAX_Z_AXIS = 2
    const D_TIME = 8

    const isOpened: Ref<boolean> = ref<boolean>(props.initiallyOpened)
    const isMoving: Ref<boolean> = ref<boolean>(false)

    const rotateX: Ref<number> = ref<number>(0)
    const rotateY: Ref<number> = ref<number>(props.initiallyOpened ? 0 : 180)
    const rotateZ: Ref<number> = ref<number>(0)

    const zAxis: Ref<number> = ref<number>(0)

    const turnCard = async () => {
      if (isMoving.value) return

      const ROTATION_DELAY = 100

      let dTimeZ1 = 0
      let dTimeZ2 = 0
      let dTimeRotate = 0
      isMoving.value = true

      const initRotateY = rotateY.value

      return new Promise((resolve) => {
        const firstMovementIntervalId = setInterval(() => {
          zAxis.value = easeInOutCubic(dTimeZ1, 0, MAX_Z_AXIS, props.openCloseAnimationDuration)

          if (dTimeZ1 >= ROTATION_DELAY) {
            rotateY.value = easeInOutCubic(dTimeRotate, initRotateY, 180, props.openCloseAnimationDuration - ROTATION_DELAY)
            dTimeRotate += D_TIME
          }

          if (rotateY.value >= initRotateY + 180) {
            clearInterval(firstMovementIntervalId)

            setTimeout(() => {
              const secondMovementIntervalId = setInterval(() => {
                zAxis.value = easeInOutCubic(dTimeZ2, MAX_Z_AXIS, -MAX_Z_AXIS, props.goBackDuration)

                if (zAxis.value <= 0) {
                  clearInterval(secondMovementIntervalId)
                  isMoving.value = false
                  resolve(true)
                }

                dTimeZ2 += D_TIME
              }, D_TIME)
            }, props.holdAfterTurningDuration)
          }

          dTimeZ1 += D_TIME
        }, D_TIME)
      })
    }

    const openCard = async () => {
      if (isOpened.value) return

      await turnCard()
      isOpened.value = true
    }

    const closeCard = async () => {
      if (!isOpened.value) return

      await turnCard()
      isOpened.value = false
    }

    const cardClickHandler = () => {
      if (isOpened.value) closeCard()
      else openCard()
    }

    return {
      cardClickHandler,
      xRotate: `${rotateX.value}deg`,
      yRotate: `${rotateY.value}deg`,
      zRotate: `${rotateZ.value}deg`,
      frontImageUrl: `url(${props.frontImage})`,
      backImageUrl: `url(${props.backImage}`,
      rotation: computed(() => `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`),
      rotationOutsize: computed(() => `translateZ(${zAxis.value * 50}px)`),
      rotationShade: computed(() => `scaleX(${Math.round(Math.abs(Math.cos(rotateY.value * Math.PI / 180) * 100)) / 100})`),
      opacityShade: computed(() => `${Math.max(0, Math.min(1, (10 - zAxis.value) / 10))}`),
      shadeBlur: computed(() => zAxis.value > 0 ? `blur(${zAxis.value * 2}px)` : 'none'),
      calculatedWidth: computed(() => `${props.width}${props.sizeMetric}`),
      calculatedHeight: computed(() => `${props.height}${props.sizeMetric}`),
      calculatedBorderRadius: computed(() => `${props.cornerRadius}${props.sizeMetric}`)
    }
  }
})
</script>

<style scoped lang="scss">
.shade-element {
  background-color: rgba(0, 0, 0, 0.4);
  width: v-bind(calculatedWidth);
  height: v-bind(calculatedHeight);
  margin: -5em 0 0 -3.5em;
  transform-origin: center;
  z-index: -1;
  border-radius: v-bind(calculatedBorderRadius);
}

.shade-blur {
  filter: v-bind(shadeBlur);
}

.shape, .face, .face-wrapper, .shade-element, .shape-body, .card-container {
  position: absolute;
  transform-style: preserve-3d;
}

.shape {
  width: 0;
  height: 0;
  transform-origin: center;
}

.face, .face-wrapper {
  overflow: hidden;
  transform-origin: 0 0;
  backface-visibility: hidden;
  /* hidden by default, prevent blinking and other weird rendering glitchs */
}

.face {
  background-size: 100% 100% !important;
  background-position: center;
}

.face-wrapper .face {
  left: 100%;
  width: 100%;
  height: 100%
}

.photon-shader {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%
}

[class*='cuboid'] .shape-body {
  width: 100%;
  height: 100%;
}

[class*='cuboid'] .shape-body .ft, [class*='cuboid'] .shape-body .bk {
  width: 100%;
  height: 100%;
}

[class*='cuboid'] .shape-body .bk {
  left: 100%;
}

/* .cub-1 styles */
.cub-1 {
  transform: translate3D(0em, 0em, 0em) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  opacity: 1;
  width: v-bind(calculatedWidth);
  height: v-bind(calculatedHeight);
  margin: -5em 0 0 -3.5em;
}

.cub-1 .shape-body .face {
  background-color: #FFFFFF;
}

.cub-1 .shape-body .ft {
  transform: translateZ(0em);
  background-image: v-bind(frontImageUrl);
  background-color: #a76c6c;
  border-radius: v-bind(calculatedBorderRadius);
  width: v-bind(calculatedWidth);
}

.cub-1 .shape-body .bk {
  transform: translateZ(0em) rotateY(180deg);
  background-image: v-bind(backImageUrl);
  background-color: #354b7e;
  border-radius: v-bind(calculatedBorderRadius);
  width: v-bind(calculatedWidth);
}

.card-rotate {
  transform: v-bind(rotation);
}
.shade-opacity {
  opacity: v-bind(opacityShade);
}
.shade-rotate {
  transform: v-bind(rotationShade);
}
.card-rotate-outside {
  transform: v-bind(rotationOutsize);
}
</style>
