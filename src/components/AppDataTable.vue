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
        {{ domain[key] }}
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
  border: 2px solid #8ebc9f;
  border-radius: 3px;
  background-color: #fff;
  margin: 30px auto;
}

th {
  background-color: #8ebc9f;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
  word-wrap: break-word;
}

th,
td {
  min-width: 90px;
  max-width: 120px;
  padding: 10px 20px;
  font-size: 12px;
}
</style>
