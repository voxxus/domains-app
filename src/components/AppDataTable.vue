<template>
  <div>
    <table class="data-table">
      <thead>
      <tr>
        <th v-for="(column, index) in dataColumns"
            :key="index"
            class="data-table__header"
            @click="$emit('sortColumn', column.key)"
        >
          {{ column.value }}
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
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  &__data {
    background-color: #f9f9f9;
    overflow-wrap: break-word;
  }

  &__header, &__data {
    min-width: 70px;
    max-width: 120px;
    padding: 10px 20px;
    font-size: 12px;
  }
}
</style>
