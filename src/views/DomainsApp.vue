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
            {{ item.exchange }}, {{ item.priority }}
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
    <div v-else>No data found</div>
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
          item.MX === null ? item.MX = [] : item.MX;
          // const { MX } = item.MX;
          // const exchange = item.MX.priority;
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
};
</script>
