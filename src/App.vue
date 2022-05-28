<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    RouterLink, RouterView
  },
  created() {
    // получение списка из локального хранилища пользователя
    const storage = JSON.parse(localStorage.getItem('_FAV-CATS'))
    if (storage && storage.cats && storage.cats.length > 0) {
      this.$store.dispatch('setFavoriteCats', { cats: storage.cats })
    } else {
      this.$store.dispatch('setFavoriteCats', { cats: [] })
    }
  }
}
</script>

<template>
  <header class="header">
    <nav class="header__wrapper">
      <router-link exact exact-active-class="header__link_active" class="header__link" to="/">Все котики</router-link>
      <router-link exact exact-active-class="header__link_active" class="header__link" to="/favorite">Любимые котики</router-link>
    </nav>
  </header>

  <main>
    <router-view />
  </main>
</template>

<style lang='scss'>
  .header {
    width: 100%;
    background: $header-bg;
    box-shadow: 0px 4px 4px $header-shadow;
    display: flex;
    justify-content: center;

    &__wrapper {
      max-width: 1440px;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0px 62px;
    }

    &__link {
      padding: 23px 27px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0.25px;
      color: $nav-link;
      opacity: .7;
      transition: opacity .15s ease-out, background-color .15s ease-out;
      &_active {
        opacity: 1;
        background: $nav-link-bg-active;
      }
    }
  }
  main {
    height: 100%;
    overflow: hidden;
  }
</style>
