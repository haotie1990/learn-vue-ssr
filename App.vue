<template>
  <div class="body">
    <header></header>
    <content>
      <router-view></router-view>
    </content>
    <footer></footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Content from './components/Content.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Content,
    Footer
  }
}
</script>

<style>
.body {
  min-height: 100vh;
  background: #fff;
}
</style>