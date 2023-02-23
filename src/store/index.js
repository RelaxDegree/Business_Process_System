import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import crt from './crt'
Vue.use(Vuex)

export const store = new Vuex.Store({


  modules:{
    crt,
    tab
  }
})