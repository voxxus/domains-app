<template>
  <div id="app">
    <TheHeader class="header"/>
    <router-view/>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';

export default {
  name: 'app',
  components: {
    TheHeader,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

.header {
  font-size: 36px;
}
</style>
