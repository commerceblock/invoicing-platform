<template>
  <div class="wrapper">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div class="navbar-brand">
            <router-link to="/"><img src="/static/assets/logo-commcereblock-white.svg" /></router-link>
          </div>
        </div>

        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-left">
            <li class="active">
              <router-link to="/">Invoices</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <button type="button" class="btn btn-default logout-btn" v-on:click="logout">
              <span class="fa fa-sign-out"></span> Log out
            </button>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import gql from 'graphql-tag'
import {
  isEmpty,
  each,
} from 'lodash'
import {
  getCreds,
  reset,
} from '../../lib/vault'

export default {
  name: 'home',
  data: function () {
    return {
      traderId: null
    }
  },
  methods: {
    logout() {
      reset();
      each(this.$children, child => {
        if(child.reset) {
          child.reset();
        }
      });
      this.traderId = null;
      this.$router.push('/login');
    }
  },
  mounted: function () {
    // TODO: we should use vuex as a proper store.
    this.traderId = getCreds().traderId;
  }
}
</script>

<style scoped>

nav {min-height: 70px; background-color: #36373A;}
nav .navbar-header {min-height: 70px;}

@media only screen and (min-width : 768px) {
  nav ul.navbar-nav li { margin: 10px 10px 0 10px; height: 60px; background-color: transparent; }
  nav ul.navbar-nav { margin-left: 50px; }
  nav ul.navbar-nav a { color: #ffffff; border-style: solid; border-width: 0 0 3px 0; border-color: #36373A; height: 61px; }
  nav ul.navbar-nav a:hover,
  nav ul.navbar-nav li.active a { border-color: #ffffff; background-color: transparent; }
  nav .logout-btn {background-color: #36373A; border-color: #ccc; color: #fff; margin-top: 17px;}
}

.content {
  margin-top: 50px;
}

</style>
