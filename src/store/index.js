import Vue from 'vue'
import Vuex from 'vuex'
import xzwxzw from './tab'
import proCreate from './crt'
import sja from './sja'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules:{
    xzwxzw,
    proCreate,
    sja
  }
})