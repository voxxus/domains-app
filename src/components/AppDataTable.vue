<template>
  <div>
    <div class="data-input">
      <label for="search">
        Поиск доменов: <input id="search" v-model="search">
      </label>
    </div>
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
  data() {
    return {
      search: '',
      searchMX: '',
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
  },
  methods: {
    sort(col) {
      if (this.sortCol === col) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortCol = col;
      }
      this.dataList.sort(this.sortBy(col, this.sortDir));
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
    filteredList() {
      const searchStr = this.search.toLowerCase();
      // eslint-disable-next-line array-callback-return,consistent-return
      return this.dataList.filter((item) => {
        if (item.domain.indexOf(searchStr) > -1
          || item.create_date.toLowerCase()
            .indexOf(searchStr) > -1
          || item.update_date.toLowerCase()
            .indexOf(searchStr) > -1
          || item.country.toLowerCase()
            .indexOf(searchStr) > -1
          || item.isDead.toLowerCase()
            .indexOf(searchStr) > -1
          || item.A.join(', ')
            .indexOf(searchStr) > -1
          || item.NS.join(', ')
            .indexOf(searchStr) > -1
          || item.CNAME.join(', ')
            .indexOf(searchStr) > -1
          || item.TXT.join(', ')
            .indexOf(searchStr) > -1) {
          return item;
        }
        // eslint-disable-next-line no-restricted-syntax,guard-for-in
        for (const val in item.MX) {
          if (Object.values(item.MX[val]).join(' - ').indexOf(searchStr) > -1) {
            return item;
          }
        }
      });
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
    max-width: 120px;
    padding: 10px 20px;
    font-size: 12px;
  }
}

input {
  margin-top: 30px;
  margin-left: 5px;
  padding: 5px;
}

.data-input {
  text-align: left;
  margin-left: 10px;
}
</style>
