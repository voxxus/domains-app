<template>
  <div>
    <div>
      <router-link to="/">Главная</router-link>
    </div>
    <Loader v-if="loading"/>
    <AppDataTable v-else-if="domainsList.length"
                  :domains="domainsList"
                  :domainColumns="domainColumns"
                  :domainKeys="domainKeys"
    />
    <p v-else>No data found</p>
    <AppList :items="domainsList">
      <template #item="{item}">
        {{ item.domain }}
      </template>
    </AppList>
  </div>
</template>

<script>
import AppList from '@/components/AppList.vue';
import Loader from '@/components/Loader.vue';
import AppDataTable from '@/components/AppDataTable.vue';
import axios from 'axios';

export default {
  name: 'DomainsApp',
  components: {
    AppList,
    Loader,
    AppDataTable,
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
    };
  },
  mounted() {
    // eslint-disable-next-line no-undef
    axios
      .get('http://localhost:8080/v1/domains/search')
      // eslint-disable-next-line no-return-assign
      .then((response) => {
        this.domainsList = response.data.domains;
        this.loading = false;
      });
  },
};
</script>
