<template>
  <div>
    <div>
      <router-link to="/">Главная</router-link>
    </div>
    <Loader v-if="loading"/>
    <div v-else-if="domainsList.length" class="table-wrapper">
      <AppDataTable
        :data-list="domainsList"
        :data-columns="domainColumns"
      >
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
    <EmptyList v-else/>
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
          placeholder: 'Поиск по домену',
          search: '',
          isSortable: true,
        },
        {
          key: 'create_date',
          value: 'Дата создания',
          placeholder: 'Поиск по дате создания',
          search: '',
          isSortable: true,
        },
        {
          key: 'update_date',
          value: 'Дата обновления',
          placeholder: 'Поиск по дате обновления',
          search: '',
          isSortable: false,
        },
        {
          key: 'country',
          value: 'Страна',
          placeholder: 'Поиск по стране',
          search: '',
          isSortable: false,
        },
        {
          key: 'isDead',
          value: 'Остановлен',
          placeholder: 'Поиск по статусу работы',
          search: '',
          isSortable: false,
        },
        {
          key: 'A',
          value: 'Адрес',
          placeholder: 'Поиск по IP-адресу',
          search: '',
          isSortable: false,
        },
        {
          key: 'NS',
          value: 'Имя сервера',
          placeholder: 'Поиск по имени сервера',
          search: '',
          isSortable: false,
        },
        {
          key: 'CNAME',
          value: 'Псевдоним',
          placeholder: 'Поиск по псевдониму',
          search: '',
          isSortable: false,
        },
        {
          key: 'MX',
          value: 'Почтовый адрес',
          placeholder: 'Поиск по почтовому адресу',
          search: '',
          isSortable: false,
        },
        {
          key: 'TXT',
          value: 'Запись',
          placeholder: 'Поиск по записи',
          search: '',
          isSortable: false,
        },
      ],
      loading: true,
      search: '',
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
};
</script>
