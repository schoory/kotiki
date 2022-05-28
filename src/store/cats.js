export const cats = {
  state: () => ({
    cats: [],
    favoriteCats: []
  }),
  mutations: {
    addCatsToCollection(state, payload) {
      state.cats = [...state.cats, ...payload.cats]
    },
    setCatsCollection(state, payload) {
      state.cats = payload.cats
    },
    setFavoriteCatsCollection(state, payload) {
      state.favoriteCats = payload.cats
    },
    changeCatFavoriteProperty(state, payload) {
      state.cats.find(cat => cat.id === payload.id).isFavorite = payload.isFavorite
      state.favoriteCats = [...state.favoriteCats, ...state.cats.filter(cat => cat.isFavorite && !state.favoriteCats.includes(cat))]
    },
    clearCollection(state) {
      state.cats = []
    }
  },
  actions: {
    addCats({ commit }, payload) {
      commit('addCatsToCollection', payload)
    },
    setCats({ commit }, payload) {
      commit('setCatsCollection', payload)
    },
    setFavoriteCats({ commit }, payload) {
      commit('setFavoriteCatsCollection', payload)
    },
    changeFavoriteProperty({ commit }, payload) {
      commit('changeCatFavoriteProperty', payload)
    },
    clearCats({ commit }) {
      commit('clearCollection')
    }
  },
  getters: {
    cats: s => s.cats,
    favoriteCats: s => s.favoriteCats
  }
}