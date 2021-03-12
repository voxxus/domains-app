<template>
  <div>
    <div class="data-input">
      <label for="search">
        Поиск доменов:<input id="search" type="text" v-model="search">
      </label>
    </div>
    <table>
      <thead>
      <tr>
        <th v-for="(column, index) in domainColumns"
            :key="index"
            @click="sort(column)"
        >
          {{ column }}
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-if="filteredDomains.length">
        <tr v-for="(domain, index) in filteredDomains" :key="index">
          <td v-for="(key, index) in domainKeys" :key="index">
            <slot :name="key" :domain="domain" :index="index"/>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td :colspan="domainColumns.length">No data</td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      sortDir: 'asc',
      sortCol: 'Домен',
    };
  },
  props: {
    domains: {
      type: Array,
      default: () => [],
    },
    domainColumns: {
      type: Array,
      default: () => [],
    },
    domainKeys: {
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
      this.domains.sort(this.sortBy(col, this.sortDir));
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
    filteredDomains() {
      // eslint-disable-next-line array-callback-return,consistent-return
      const searchStr = this.search.toLowerCase();
      // eslint-disable-next-line array-callback-return,consistent-return
      return this.domains.filter((domain) => {
        if (domain.domain.indexOf(searchStr) > -1
          || domain.create_date.toLowerCase().indexOf(searchStr) > -1
          || domain.update_date.toLowerCase().indexOf(searchStr) > -1
          || domain.country.toLowerCase().indexOf(searchStr) > -1
          || domain.isDead.toLowerCase().indexOf(searchStr) > -1
          || domain.A.join(', ').indexOf(searchStr) > -1
          || domain.NS.join(', ').indexOf(searchStr) > -1
          || domain.CNAME.join(', ').indexOf(searchStr) > -1
          || domain.TXT.join(', ').indexOf(searchStr) > -1) {
          return domain;
        }
      });
    },
  },
};
</script>

<style scoped>
table {
  border: 1px solid #747678;
  border-radius: 3px;
  background-color: #eee;
  margin: 5px auto;
  width: 1500px;
}

th {
  background-color: #747678;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
  overflow-wrap: break-word;
}

th,
td {
  max-width: 120px;
  padding: 10px 20px;
  font-size: 12px;
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
