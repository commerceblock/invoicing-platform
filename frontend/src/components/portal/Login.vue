<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div v-if="showLogin">
            <div class="modal-header">
              <slot name="header">
                <span class="tab-title">Log into CommerceBlock</span>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                <div v-if=errorResponse class="alert alert-danger" role="alert">
                  <p>{{errorResponse}}</p>
                </div>
                <div class="login-description">
                  Please ensure you are not being watched or that only people who should have access to the account are present.
                </div>
                <div v-bind:class="{ 'seed-input-red': !isValid, 'seed-input-green': isValid }">
                  <textarea class="form-control span6 prvKey" name="mnemonic" placeholder="Log in with your Seed or generate a new Seed with the button below" v-model="mnemonic" rows="3" />
                </div>
                <div class="generate-new">
                  <a @click="showMessageTab">
                    <i class="fa fa-refresh"></i> Generate New Seed</a>
                </div>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <button class="btn btn-success btn-lg btn-block" @click="login">Log In</button>
              </slot>
            </div>
          </div>

          <div v-if="showMessage">
            <div class="modal-header">
              <slot name="header">
                <span class="tab-title">New Account</span>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                <div>Important Notice!</div>
                <p>1. With CommerceBlock there are no traditional login accounts.</p>
                <p>All information is encrypted and can only be accessed via a unique 12 words Seed, simply a series of random words, which acts as both your username and password.</p>
                <p>2. This Seed is extremly important and must be kept in a secure place. It is advisable to backup your Seed in an equally secure place.</p>
                <p>3. The only way to retreive your information is by using the Seed, for security and privacy purposes, CommerceBlock does not have access to any information and will never be able to retreive associated data if you lose your Seed.</p>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <button class="btn btn-success btn-lg btn-block" @click="showSeedTab">I Understand</button>
              </slot>
            </div>
          </div>

          <div v-if="showSeed">
            <div class="modal-header">
              <slot name="header">
                <span class="tab-title">Seed Generation</span>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                <div class="seed-description">
                  Please ensure you are not being watched or that only people who should have access to the account are present.
                </div>
                <div>
                  <textarea class="form-control span6 prvKey" name="mnemonic" readonly="readonly" v-model="newMnemonic" rows="3" />
                </div>
                <div class="write-down-msg">
                  Make sure you write down your Seed before you continue
                </div>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <button class="btn btn-success btn-lg btn-block" type="submit" @click="showVerificationTab">Continue to Verification</button>
              </slot>
            </div>
          </div>

          <div v-if="showVerification">
            <div class="modal-header">
              <slot name="header">
                <span class="tab-title">Seed Verification</span>
              </slot>
            </div>
            <div class="modal-body small">
              <slot name="body">
                <div class="seed-description">
                  Please ensure you are not being watched or that only people who should have access to the account are present.
                </div>
                <div class="seed-box">
                  <div class="row">
                    <div class="col-xs-2"><div class="seed-item">round</div></div>
                    <div class="col-xs-2"><div class="seed-item">stadium</div></div>
                    <div class="col-xs-2"><div class="seed-item">eagle</div></div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-2"><div class="seed-item">round</div></div>
                  <div class="col-xs-2"><div class="seed-item">stadium</div></div>
                  <div class="col-xs-2"><div class="seed-item">eagle</div></div>
                  <div class="col-xs-2"><div class="seed-item">kid</div></div>
                  <div class="col-xs-2"><div class="seed-item">rubber</div></div>
                  <div class="col-xs-2"><div class="seed-item">chunk</div></div>
                  <div class="col-xs-2"><div class="seed-item">agent</div></div>
                  <div class="col-xs-2"><div class="seed-item">marble</div></div>
                  <div class="col-xs-2"><div class="seed-item">extra</div></div>
                  <div class="col-xs-2"><div class="seed-item">square</div></div>
                  <div class="col-xs-2"><div class="seed-item">stereo</div></div>
                  <div class="col-xs-2"><div class="seed-item">busy</div></div>
                </div>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <button class="btn btn-success btn-lg btn-block" type="submit" @click="register">Log In</button>
              </slot>
            </div>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import 'whatwg-fetch';
import httpStatus from 'http-status-codes';
import gql from 'graphql-tag';
import Mnemonic from 'bitcore-mnemonic';
import {
  isEmpty,
} from 'lodash'
import {
  computeAccessKey,
  isValid,
} from '../../lib/credentials'
import {
  setCreds,
  setAccessToken,
} from '../../lib/vault'
import endpoints from '../../lib/endpoints'

export default {
  name: 'Login',
  data: function() {
    return {
      mnemonic: null,
      newMnemonic: null,
      errorResponse: null,
      showLogin: true,
      showMessage: false,
      showSeed: false,
      showVerification: false,
    }
  },
  methods: {
    showMessageTab: function() {
      this.showLogin = false;
      this.showVerification = false;
      this.showSeed = false;
      this.showMessage = true;
    },
    showSeedTab: function() {
      this.generateNewMnemonic();
      this.showLogin = false;
      this.showMessage = false;
      this.showVerification = false;
      this.showSeed = true;
    },
    generateNewMnemonic: function () {
      const code = new Mnemonic();
      this.newMnemonic = code.toString();
    },
    showVerificationTab: function() {
      this.showLogin = false;
      this.showMessage = false;
      this.showSeed = false;
      this.showVerification = true;
    },
    login: function() {
      // TODO:: toggle progress bar
      const creds = computeCreds(this.mnemonic)
      if (creds !== null) {
        // access query
        this.errorResponse = null;
        const data = {
          trader_id: creds.traderId,
          trader_signature: creds.traderSignature
        };
        const that = this;
        fetch(endpoints.portalLogin(), {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          },
        }).then(function(response) {
          if (response.status === 201) {
            return response.json();
          } else {
            that.errorResponse = "Unknown Seed, please verify your input.";
          }
        }, function(error) {
          console.log(error);
          that.errorResponse = "Failed to connect to server, please try again.";
        }).then(data => {
          if (data) {
            setCreds(that.creds);
            setAccessToken(data.access_token_id);
            that.$router.push('/');
          }
        });
      } else if (isEmpty(this.mnemonic)) {
        // empty phrase
        this.errorResponse = 'seed is empty';
      } else if (!isValid(this.mnemonic)) {
        // check phrase
        this.errorResponse = 'seed is not valid, seed must be 12 words.';
      }
    },
    register: function() {
      const creds = computeAccessKey(this.newMnemonic)
      const request = {
        trader_id: creds.traderId,
        trader_signature: creds.traderSignature
      };
      const that = this;
      fetch(endpoints.portalSignup(), {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json"
        },
      }).then(function(response) {
        if (response.status === 201) {
          return response.json();
        } else {
          // TODO handle error
        }
      }, function(error) {
        // TODO handle error
        console.log(error)
      }).then((data) => {
        if (data) {
          return fetch(endpoints.portalLogin(), {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
              "Content-Type": "application/json"
            },
          });
        }
      }).then(function(response) {
        if (response) {
          if (response.status === 201) {
            return response.json();
          } else {
            // TODO handle error
          }
        }
      }, function(error) {
        // TODO handle error
        console.log(error)
      }).then(data => {
        if (data) {
          setCreds(creds);
          setAccessToken(data.access_token_id);
          this.$router.push('/');
        }
      });
    }
  },
  computed: {
    isValid: function() {
      return this.mnemonic && isValid(this.mnemonic.trim())
    },
  },
}

export function computeCreds(mnemonic) {
  if (mnemonic && isValid(mnemonic.trim())) {
    return computeAccessKey(this.mnemonic.trim());
  } else {
    return null;
  }
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
  height: 500px;
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

.modal-header {
  text-align: center;
}

.write-down-msg {
  color: #141414;
  font-family: "Open Sans";
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-top: 40px;
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

.seed-input-red textarea:focus {
  border-color: red;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(126, 239, 104, 0.6);
  outline: 0 none;
}

.seed-input-green textarea:focus {
  border-color: #258C42;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(126, 239, 104, 0.6);
  outline: 0 none;
}

.tab-title {
  color: #141414;
  font-family: "Open Sans";
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
}

.login-description {
  color: #141414;
  font-family: "Open Sans";
  font-size: 14px;
  line-height: 19px;
  margin: 5px 0 30px 0;
}

.seed-description {
  color: #141414;
  font-family: "Open Sans";
  font-size: 14px;
  line-height: 19px;
  margin: -20px 0 15px 0;
}

.generate-new {
  margin-top: 10px;
}

.generate-new a {
  color: #258C42;
}

.modal-body.small {
  margin: 10px 0;
}

.seed-box {
  height: 80px;
  margin-bottom: 20px;
  border: 1px solid #979797;
  padding: 10px;
}

.seed-item {
  background-color: #258C42;
  color: #fff;
  padding: 3px;
  border-radius: 2px;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
