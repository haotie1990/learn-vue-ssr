<template>
  <div id="app" class="body">
    <nav-header></nav-header>
    <div class="content">
      <router-view></router-view>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import NavHeader from './components/Header.vue';
import CommonFooter from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    NavHeader,
    CommonFooter
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
.body {
  min-height: 100vh;
  background: #fff;
}
.body .content {
  min-height: calc(100% - 50px);
  padding: 16px;
  background: #fff;
}
</style>