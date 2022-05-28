<script>
import CatCard from '@/components/CatCard.vue'
export default {
  components: {
    CatCard
  }
}
</script>

<template>
  <div class="card-list">
    <div class="card-list__wrapper">
      <cat-card v-for="cat in $store.getters.favoriteCats" :key="cat.id" :cat="cat" />
    </div>
  </div>
</template>
