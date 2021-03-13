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
        :data-list="domainsList"
        :data-columns="domainColumns"
        :data-keys="domainKeys"
        :search="search"
        :filtered-list="filteredDomains"
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
        'Домен',
        'Дата создания',
        'Дата обновления',
        'Страна',
        'Остановлен',
        'Адрес',
        'Имя сервера',
        'Псевдоним',
        'Почтовый адрес',
        'Запись',
      ],
      domainKeys: [
        'domain',
        'create_date',
        'update_date',
        'country',
        'isDead',
        'A',
        'NS',
        'CNAME',
        'MX',
        'TXT',
      ],
      loading: true,
      search: '',
    };
  },
  created() {
    axios
      .get('http://localhost:8080/v1/domains/search')
      .then((response) => {
        // eslint-disable-next-line no-return-assign,no-param-reassign
        this.domainsList = response.data.domains.map((item) => {
          // eslint-disable-next-line no-unused-expressions,no-param-reassign
          item.country === null ? item.country = '-' : item.country;
          // eslint-disable-next-line no-unused-expressions,no-param-reassign
          item.A === null ? item.A = ['-'] : item.NS;
          // eslint-disable-next-line no-unused-expressions,no-param-reassign
          item.NS === null ? item.NS = ['-'] : item.NS;
          // eslint-disable-next-line no-unused-expressions,no-param-reassign
          item.CNAME === null ? item.CNAME = ['-'] : item.CNAME;
          // eslint-disable-next-line no-unused-expressions,no-param-reassign
          item.MX === null ? item.MX = ['-'] : item.MX;
          // eslint-disable-next-line no-unused-expressions,no-param-reassign
          item.TXT === null ? item.TXT = ['-'] : item.TXT;
          // console.log(MX[].exchange);
          return item;
        });
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  },
  computed: {
    filteredDomains() {
      const searchStr = this.search.toLowerCase();
      // eslint-disable-next-line array-callback-return,consistent-return
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
        // eslint-disable-next-line no-restricted-syntax,guard-for-in
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
