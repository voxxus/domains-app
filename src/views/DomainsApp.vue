<template>
  <div>
    <div>
      <router-link to="/">Главная</router-link>
    </div>
    <Loader v-if="loading"/>
    <div v-else-if="domainsList.length" class="table-wrapper">
      <div class="data-input">
        <label for="search">
          Поиск доменов: <input id="search" class="input" v-model="search">
        </label>
      </div>
      <AppDataTable
        :data-list="filteredDomains"
        :data-columns="domainColumns"
        @sortColumn="sort"
      >
        <template #domain="{domain}">
          {{ domain.domain }}
        </template>
        <template #create_date="{domain}">
          {{ domain.create_date }}
        </template>
        <template #update_date="{domain}">
          {{ domain.update_date }}
        </template>
        <template #country="{domain}">
          {{ domain.country }}
        </template>
        <template #isDead="{domain}">
          {{ domain.isDead }}
        </template>
        <template #A="{domain}">
          <AppList v-if="domain.A" :items="domain.A">
            <template #item="{item}">
              {{ item }}
            </template>
          </AppList>
        </template>
        <template #NS="{domain}">
          <AppList v-if="domain.NS" :items="domain.NS">
            <template #item="{item}">
              {{ item }}
            </template>
          </AppList>
        </template>
        <template #CNAME="{domain}">
          <AppList v-if="domain.CNAME" :items="domain.CNAME">
            <template #item="{item}">
              {{ item }}
            </template>
          </AppList>
        </template>
        <template #MX="{domain}">
          <AppList v-if="domain.MX" :items="domain.MX">
            <template #item="{item}">
              {{ item.exchange }} - {{ item.priority }}
            </template>
          </AppList>
        </template>
        <template #TXT="{domain}">
          <AppList v-if="domain.TXT" :items="domain.TXT">
            <template #item="{item}">
              {{ item }}
            </template>
          </AppList>
        </template>
      </AppDataTable>
    </div>
    <EmptyList v-else>
      <template #emptyList/>
    </EmptyList>
  </div>
</template>

<script>
import AppList from '@/components/AppList.vue';
import Loader from '@/components/Loader.vue';
import AppDataTable from '@/components/AppDataTable.vue';
import EmptyList from '@/components/EmptyList.vue';
import axios from 'axios';

export default {
  name: 'DomainsApp',
  components: {
    AppList,
    Loader,
    AppDataTable,
    EmptyList,
  },
  data() {
    return {
      domainsList: null,
      domainColumns: [
        {
          key: 'domain',
          value: 'Домен',
        },
        {
          key: 'create_date',
          value: 'Дата создания',
        },
        {
          key: 'update_date',
          value: 'Дата обновления',
        },
        {
          key: 'country',
          value: 'Страна',
        },
        {
          key: 'isDead',
          value: 'Остановлен',
        },
        {
          key: 'A',
          value: 'Адрес',
        },
        {
          key: 'NS',
          value: 'Имя сервера',
        },
        {
          key: 'CNAME',
          value: 'Псевдоним',
        },
        {
          key: 'MX',
          value: 'Почтовый адрес',
        },
        {
          key: 'TXT',
          value: 'Запись',
        },
      ],
      loading: true,
      search: '',
      sortDir: 'asc',
      sortCol: 'domain',
    };
  },
  created() {
    axios
      .get('http://localhost:8080/v1/domains/search')
      .then((response) => {
        this.domainsList = response.data.domains.map((item) => {
          item.country === null ? item.country = '-' : item.country;
          item.A === null ? item.A = ['-'] : item.NS;
          item.NS === null ? item.NS = ['-'] : item.NS;
          item.CNAME === null ? item.CNAME = ['-'] : item.CNAME;
          item.MX === null ? item.MX = ['-'] : item.MX;
          item.TXT === null ? item.TXT = ['-'] : item.TXT;
          return item;
        });
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  },
  methods: {
    sort(col) {
      if (this.sortCol === col) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortCol = col;
      }
      return this.domainsList.sort(this.sortBy(col, this.sortDir));
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
      const searchStr = this.search.toLowerCase();
      // eslint-disable-next-line consistent-return
      return this.domainsList.filter((item) => {
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
        // eslint-disable-next-line no-restricted-syntax
        for (const val in item.MX) {
          if (Object.values(item.MX[val])
            .join(' - ')
            .indexOf(searchStr) > -1) {
            return item;
          }
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.data-input {
  text-align: left;
  margin-left: 10px;

  .input {
    margin-top: 30px;
    margin-left: 5px;
    padding: 5px;
  }
}
</style>
