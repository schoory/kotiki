<template>
  <div class="favorite-btn">
    <icon-favorite-contained v-if="selected" />
    <icon-favorite v-else />
  </div>
</template>

<script>
import IconFavorite from '@/components/icons/IconFavorite.vue'
import IconFavoriteContained from '@/components/icons/IconFavoriteContained.vue'

export default {
  props: ['selected'],
  components: {
    IconFavorite,
    IconFavoriteContained
  }
}
</script>

<style lang="scss">
  .favorite-btn {
    box-sizing: initial;
    width: 48px;
    height: 48px;
    color: v-bind("selected ? '#FF3A00' : 'transparent'");
    cursor: pointer;
    transition: color .1s ease-out;
    &:hover {
      color: v-bind("selected ? '#FF3A00' : '#F24E1E'");
    }
  }
</style>