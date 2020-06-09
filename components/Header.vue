<template>
  <div class="header">
    <div class="app-title">
      <h4>Super Star</h4>
      <img src="../assets/whistle-stars.svg" width="80" color="whitesmoke"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>
<style scoped>
.header {
  background-color: whitesmoke;
  width: 100vw;
  height: 8vh;
}
.app-title {
  width: 100vw;
  height: 9vh;
  padding-left: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  color: black;
  text-transform: uppercase;
}
</style>
