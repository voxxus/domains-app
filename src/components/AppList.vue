<template>
  <ol class="app-list">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="app-list__item"
    >
      <slot name="item" :item="item" :index="index"/>
    </li>
  </ol>
</template>

<script>

export default {
  name: 'AppList',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.app-list {
  margin: 0;
  padding: 0;
}

.app-list__item {
  list-style: none;
  margin-bottom: 10px;
}

.app-list__item:last-child {
  margin-bottom: 0;
}
</style>
