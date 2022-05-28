import { createStore } from 'vuex'
import { cats } from './cats'

export const store = createStore({
  modules: {
    cats: cats
  }
})