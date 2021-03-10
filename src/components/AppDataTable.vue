<template>
  <table>
    <thead>
    <tr>
      <th v-for="(header, index) in domainColumns"
          :key="index"
      >
        {{ header }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(domain, index) in domains" :key="index">
      <td v-for="(key, index) in domainKeys" :key="index">
        <slot :name="key" :domain="domain" :index="index"/>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
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
};
</script>

<style scoped>
table {
  border: 1px solid #747678;
  border-radius: 3px;
  background-color: #eee;
  margin: 30px auto;
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
</style>
