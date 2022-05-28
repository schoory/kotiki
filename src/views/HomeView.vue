<script>
import CatCard from '@/components/CatCard.vue'

export default {
  data() {
    return {
      isFetching: false,
      currentPage: 1
    }
  },
  methods: {
    async fetchCats(page) {
      try {
        this.isFetching = true 
        // получение информации
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=15&order=Rand&page=${page}`, 
          { method: 'GET', headers: { 'x-api-key': "d2028a9e-7f82-4c54-82ec-7dc397440b24" } }
        )
        const result = await response.json()
        // добавление поля isFavorite 
        const cats = result.map(cat => {
          return { isFavorite: false, id: cat.id, url: cat.url }
        })
        // если в хранилище уже есть коты добавляем, а не перезаписываем
        if (this.$store.getters.cats.length === 0) {
          this.$store.dispatch('setCats', { cats: cats })
        } else {
          this.$store.dispatch('addCats', { cats: cats })
        }
        this.isFetching = false
      } catch(error) {
        this.isFetching = false
        console.log('Во время получения списка изображений произошла ошибка');
      }
    },
    scrollingList({ target }) {
      // когда скролл достигает конца, загружаем список
      if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 100 && !this.isFetching) {
        this.currentPage++
        this.fetchCats(this.currentPage)
      }
    }
  },
  mounted() {
    // получение списка при загрузке страницы
    if (this.$store.getters.cats.length === 0) {
      this.fetchCats(this.currentPage)
    }
  },
  components: {
    CatCard
  }
}
</script>

<template>
  <div class="card-list" @scroll="scrollingList">
    <div class="card-list__wrapper">
      <cat-card v-for="cat in $store.getters.cats" :key="cat.id" :cat="cat" />
    </div>
    <transition name="loader-transition">
      <div v-if="isFetching" class="card-loader">... Загружаем еще котиков ...</div>
    </transition>
  </div>
</template>

<style lang="scss">
  .card-list {
    display: flex;
    justify-content: center;
    overflow: auto;
    height: calc(100% - 64px);
    &__wrapper {
      width: 1440px;
      padding: 50px 70px;
      display: flex;
      flex-wrap: wrap;
      gap: 48px;
    }
  }
  .loader-transition-enter-active,
  .loader-transition-leave-active {
    transition: all .15s ease-out;
  }
  .loader-transition-enter-from,
  .loader-transition-leave-to {
    transform: translate(-50%, 100%) !important;
  }
  .card-loader {
    position: fixed;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%);
    width: 100%;
    padding: 31px 0px;
    text-align: center;
    background: #fff;
    z-index: 1;
  }
  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
</style>


