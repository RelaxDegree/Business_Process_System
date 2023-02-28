import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import proCreate from './crt'
import sja from './sja'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules:{
    proCreate,
    tab,
    sja
  }
})