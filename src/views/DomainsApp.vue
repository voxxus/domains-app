<template>
  <div>
    <div>
      <router-link to="/">Главная</router-link>
    </div>
    <Loader v-if="loading" class="loader"/>
    <div v-else-if="domainsList" class="table-wrapper">
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
    <EmptyList v-else-if="domainsList === null" class="empty">
      <template #noData>
        Ошибка! Не удалось загрузить список доменов
      </template>
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
    };
  },
  created() {
    axios
      .get('http://localhost:8080/v1/domains/search')
      .then((response) => {
        this.domainsList = response.data.domains.map((item) => {
          this.domainColumns.forEach((column) => {
            if (typeof item[column.key] === 'string' || column.key === 'country') {
              item[column.key] === null ? item[column.key] = '-' : item[column.key];
            } else if (typeof item[column.key] === 'object') {
              item[column.key] === null ? item[column.key] = ['-'] : item[column.key];
            }
          });
          return item;
        });
      })
      .catch((error) => console.log(error))
      .finally(() => this.loading = false);
  },
};
</script>

<style scoped lang="scss">
.empty, .loader {
  margin-top: 25vh;
  font-size: 30px;
}
</style>
