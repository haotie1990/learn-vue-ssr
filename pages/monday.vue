<template>
  <div class="week">
    Monday
    <div class="today">
      today: {{ today }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageMonday',
  /**
   * 此处涉及到将dispatch预取数据的操作放在何处的问题？
   * 
   * 一般来讲，按照路由进行页面的访问，并决定获取什么样的数据，并决定了哪些组件会被渲染
   * 所有会将预取数据逻辑放在路由组件中
   * 
   * 为此我们在路由组件上暴露一个自定义的静态函数（ayncData），此函数会在组件实例化之前调用，因此函数内无法访问this
   * 其上下文context，将包含：request、response、store、router
   */
  asyncData({ store }) {
    return store.dispatch('fetchToday');
  },
  computed: {
    today() {
      return this.$store.state.today;
    }
  }
}
</script>