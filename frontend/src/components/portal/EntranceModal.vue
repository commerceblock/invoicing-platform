<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <button type="button" class="close" data-dismiss="modal" @click="close">&times;</button>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <p>Welcome!</p>
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-lock"></i>
                </span>
                <textarea class="form-control span6 prvKey" name="mnemonic" placeholder="Enter your 12 words seed phrase" v-model="mnemonic" rows="3" />
              </div>
              <div v-if=erroResponse class="text-red">
                <p>{{erroResponse}}</p>
              </div>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <div class="text-center col-md-4 col-sm-offset-4">
                <button class="btn btn-primary btn-lg" type="submit" @click="signin">Sign in</button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import gql from 'graphql-tag'
import {
  isEmpty
} from 'lodash'
import {
  computeAccessKey,
  isValid
} from '../../lib/credentials'
import {
  setCreds
} from '../../lib/vault'

export default {
  name: 'EntranceModal',
  data: function () {
    return {
      mnemonic: null,
      erroResponse: null
    }
  },
  methods: {
    close: function (event) {
      this.$emit('close');
    },
    signin: function (event) {
      // TODO:: toggle progress bar
      if (this.creds !== null) {
        // access query
        this.erroResponse = null;
        // if (!this.profile.traderId) {
        //   this.erroResponse = 'Unknown seed, please register or check your seed.';
        // } else {
          setCreds(this.creds);
          // workaround: update traderId explicility
          this.$parent.traderId = this.creds.traderId
          this.close();
        // }
      } else if (isEmpty(this.mnemonic)) {
        // empty phrase
        this.erroResponse = 'seed is empty';
      } else if (!isValid(this.mnemonic)) {
        // check phrase
        this.erroResponse = 'seed is not valid, seed must be 12 words.';
      }
    }
  },
  computed: {
    creds: function () {
      if (this.mnemonic && isValid(this.mnemonic)) {
        return computeAccessKey(this.mnemonic);
      } else {
        return null;
      }
    }
  },
  apollo: {
    profile: {
      query: function () {
        if (this.creds) {
          const traderId = this.creds.traderId;
          return gql`query {
          profile(traderId : "${traderId}") {
              traderId
          }}`;
        }
        return null;
      },
      variables() {
        return {
          creds: this.creds
        }
      },
      skip() {
        return this.creds === null;
      }
    },
  },
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 650px;
  height: 440px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}




/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}

.input-group input {
  height: 4em;
}

textarea {
  resize: none;
}
</style>
