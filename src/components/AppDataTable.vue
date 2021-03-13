<template>
  <div>
    <table class="data-table">
      <thead>
      <tr>
        <th v-for="(column, index) in dataColumns"
            :key="index"
            @click="sort(column)"
            class="data-table__header"
        >
          {{ column }}
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-if="filteredList.length">
        <tr v-for="(listItem, index) in filteredList" :key="index">
          <td v-for="(key, index) in dataKeys" :key="index" class="data-table__data">
            <slot :name="key" :domain="listItem" :index="index"/>
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
  data() {
    return {
      sortDir: 'asc',
      sortCol: 'Домен',
    };
  },
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
    dataKeys: {
      type: Array,
      default: () => [],
    },
    search: {
      type: String,
      default: () => '',
    },
    filteredList: {
      type: Function,
    },
  },
  methods: {
    sort(col) {
      if (this.sortCol === col) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortCol = col;
      }
      return this.dataList.sort(this.sortBy(col, this.sortDir));
    },
    sortBy(property, order) {
      this.sortDir = order;
      return function (a, b) {
        const varA = typeof a[property] === 'string' ? a[property].toUpperCase() : a[property];
        const varB = typeof b[property] === 'string' ? b[property].toUpperCase() : b[property];
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === 'desc' ? comparison * -1 : comparison;
      };
    },
  },
  computed: {
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
