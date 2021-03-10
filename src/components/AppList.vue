<template>
  <ul class="app-list">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="app-list__item"
    >
      <slot name="item" :item="item" :index="index"/>
    </li>
  </ul>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.app-list__item {
  list-style-type: none;
  cursor: pointer;
}
</style>
