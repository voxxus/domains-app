<template>
  <div>
    <table class="data-table">
      <thead>
      <tr>
        <th v-for="(column, index) in dataColumns"
            :key="index"
            class="data-table__header"
            :class="{active: sortKey === column.key, sortable: column.isSortable}"
            @click="sort(index)"
        >
          {{ column.value }}
          <span class="data-table__arrow"
                :class="{asc: sortDirection === 'asc' && sortKey === column.key,
                desc: sortDirection === 'desc' && sortKey === column.key }"></span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td v-for="(column, index) in dataColumns" :key="index" class="data-table__data">
          <AppInput
            v-model="column.search"
            :placeholder="column.placeholder"
            :index="index"
            @focus="currentIndex = index"
          />
        </td>
      </tr>
      <template v-if="filteredList.length">
        <tr v-for="(listItem, index) in filteredList" :key="index">
          <td v-for="(column, index) in dataColumns" :key="index" class="data-table__data">
            <slot :name="column.key"
                  :domain="listItem"
                  :index="index"
            >
              {{ listItem[column.key] }}
            </slot>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td :colspan="dataColumns.length">
            <EmptyList/>
          </td>
        </tr>
      </template>
      </tbody>
      <tfoot v-if="filteredList.length">
      <tr>
        <td :colspan="dataColumns.length" class="data-table__footer">
          Кол-во доменов: {{ filteredList.length }}
        </td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import EmptyList from '@/components/EmptyList.vue';
import AppInput from '@/components/AppInput.vue';

export default {
  name: 'AppDataTable',
  components: {
    AppInput,
    EmptyList,
  },
  data() {
    return {
      sortDirection: 'asc',
      sortKey: '',
    };
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
  methods: {
    sort(index) {
      const col = this.dataColumns[index].key;
      if (this.dataColumns[index].isSortable) {
        if (this.sortKey === col) {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortKey = col;
        }
        return this.dataList.sort(this.sortBy(col, this.sortDirection));
      }
      return this.dataList;
    },
    sortBy(property, order) {
      this.sortDirection = order;
      return (a, b) => {
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
      const filledSearch = this.dataColumns.filter((item) => item.search);
      if (!filledSearch.length) {
        return this.dataList;
      }
      let result = this.dataList;
      filledSearch.forEach((val) => {
        // eslint-disable-next-line consistent-return
        result = result.filter((item) => {
          if (typeof item[val.key] === 'string') {
            if (item[val.key].toLowerCase()
              .includes(val.search.toLowerCase())) {
              return item;
            }
          } else if (Array.isArray(item[val.key])) {
            // eslint-disable-next-line no-restricted-syntax,guard-for-in
            for (const el in item[val.key]) {
              if (typeof item[val.key][el] === 'object' && Object.values(item[val.key][el])
                .join(' - ')
                .toLowerCase()
                .includes(val.search.toLowerCase())) {
                return item;
              }
            }
            if (item[val.key].join(', ')
              .toLowerCase()
              .includes(val.search.toLowerCase())) {
              return item;
            }
          }
        });
      });
      return result;
    },
  },
};
</script>

<style scoped lang="scss">

.data-table {
  border: 1px solid #747678;
  border-radius: 3px;
  background-color: #eee;
  margin: 30px auto;
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
    min-width: 150px;
    max-width: 150px;
    padding: 10px;
    font-size: 13px;
  }

  &__footer {
    font-size: 14px;
    font-weight: bold;
    text-align: right;
    padding: 10px;
  }
}
</style>
