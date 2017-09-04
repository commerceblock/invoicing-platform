<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
body {
  background-color: #F9F9F9;
}
@media (max-width: 650px), (max-height: 500px) {
  .wizard-navigation .wizard-nav.wizard-nav-pills .stepTitle {
    display: none;
  }
  .vue-form-wizard .wizard-header {
    padding: .2em;
  }
  .vue-form-wizard .wizard-tab-content {
    padding: 1em 0;
  }
  .vue-form-wizard .wizard-card-footer {
    flex-direction: row;
    .wizard-footer-right button {
      margin-top: 0;
    }
  }
}
</style>
