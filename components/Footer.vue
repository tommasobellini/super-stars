<template>
  <div class="footer">
    <div class="tabBar">
      <div>
        <nuxt-link to="/" class="button--green">
          <BIconHouseFill />
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/graph" class="button--green">
          <BIconGraphUp />
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/stars" class="button--green">
          <BIconStarHalf />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconHouseFill, BIconGraphUp, BIconStarHalf } from 'bootstrap-vue'

export default {
  name: 'Footer',
  components: { BIconHouseFill, BIconGraphUp, BIconStarHalf }
}
</script>
<style scoped>
.footer {
  background-color: whitesmoke;
  width: 100vw;
  height: 12vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.app-title {
  padding: 2.5vh;
  color: black;
}
.tabBar {
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.tabBar div {
  font-size: 2em;
}
</style>
