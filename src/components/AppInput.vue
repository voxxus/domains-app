<template>
  <label>
    <input
      class="input"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </label>
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.input {
  min-width: 90%;
  padding: 5px;
  font-size: 12px;
  text-align: center;
}
</style>
