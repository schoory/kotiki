<template>
  <div class="card" @mouseenter="isCardHovered = true" @mouseleave="isCardHovered = false">
    <div class="card__image" :style="{ 'background': 'center / cover url(' + cat.url + ') no-repeat' }" />
    <transition name="btn-transition">
      <favorite-button 
        v-if="isCardHovered" 
        class="card__btn" 
        :selected="$store.getters.favoriteCats.find(item => item.id === cat.id) ? cat.isFavorite : false" 
        @click="changeFavoriteProperty" 
      />
    </transition>
  </div>
</template>

<script>
import FavoriteButton from '@/components/FavoriteButton.vue';

export default {
  data() {
    return {
      isCardHovered: false
    }
  },
  props: ['cat'],
  methods: {
    changeFavoriteProperty() {
      // сохранение в vuex store
      this.$store.dispatch('changeFavoriteProperty', { id: this.cat.id, isFavorite: !this.cat.isFavorite })
      // сохранение в локальное хранилище
      const storageInfo = JSON.parse(localStorage.getItem('_FAV-CATS'))
      if (storageInfo && storageInfo.cats && storageInfo.cats.length > 0) {
        localStorage.setItem('_FAV-CATS', JSON.stringify({ cats: this.$store.getters.favoriteCats }))
      } else {
        localStorage.setItem('_FAV-CATS', JSON.stringify({ cats: [this.cat] }))
      }
    }
  },
  components: {
    FavoriteButton
  }
}

</script>

<style lang="scss">
  .btn-transition-enter-active,
  .btn-transition-leave-active {
    transition: opacity 0.15s ease-out;
  }
  .btn-transition-enter-from,
  .btn-transition-leave-to {
    opacity: 0;
  }
  .card {
    position: relative;
    width: 225px;
    height: 225px;
    background: #e5e5e5;
    transition: all .15s ease-out;
    &:hover {
      box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.24), 0px 9px 18px rgba(0, 0, 0, 0.18);
      transform: scale(1.15);
    }
    &__image {
      width: 100%;
      height: 100%;
    }
    &__btn {
      position: absolute;
      right: 7px;
      bottom: 9px;
    }
  }
</style>