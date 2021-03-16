<template>
  <div>
    <table class="data-table">
      <thead>
      <tr>
        <th v-for="(column, index) in dataColumns"
            :key="index"
            class="data-table__header"
            :class="{active: sortKey === column.key, sortable: column.isSortable}"
            @click="$emit('sortColumn', index)"
        >
          {{ column.value }}
          <span class="data-table__arrow"
                :class="{asc: sortDir === 'asc' && sortKey === column.key,
                desc: sortDir === 'desc' && sortKey === column.key }"></span>
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-if="dataList.length">
        <tr v-for="(listItem, index) in dataList" :key="index">
          <td v-for="(column, index) in dataColumns" :key="index" class="data-table__data">
            <slot :name="column.key" :domain="listItem" :index="index"/>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td :colspan="dataColumns.length">
            <EmptyList>
              <template #emptyList/>
            </EmptyList>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import EmptyList from '@/components/EmptyList.vue';

export default {
  name: 'AppDataTable',
  components: {
    EmptyList,
  },
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    dataColumns: {
      type: Array,
      default: () => [],
    },
    sortKey: {
      type: String,
      default: () => '',
    },
    sortDir: {
      type: String,
      default: () => '',
    },
  },
};
</script>

<style scoped lang="scss">

.data-table {
  border: 1px solid #747678;
  border-radius: 3px;
  background-color: #eee;
  margin: 5px auto;
  width: 1500px;

  &__header {
    background-color: #747678;
    color: rgba(255, 255, 255, 0.66);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 150px;
  }

  &__arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  &__arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
  }

  &__arrow.desc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
  }

  .active {
    color: rgba(255, 255, 255, 1);
  }

  .sortable {
    cursor: pointer;
  }

  .active .data-table__arrow {
    opacity: 1;
  }

  &__data {
    background-color: #f9f9f9;
    overflow-wrap: break-word;
  }

  &__header, &__data {
    min-width: 70px;
    max-width: 120px;
    padding: 10px;
    font-size: 12px;
  }
}
</style>
