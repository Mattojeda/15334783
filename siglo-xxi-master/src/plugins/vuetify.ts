import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@/plugins/main.styl'
import { theme } from './Design';

Vue.use(Vuetify, {
  theme: theme,
  customProperties: true,
  options: {
    customProperties: true
  },
  iconfont: 'md',
})
