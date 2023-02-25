<template>
  <button class="app-button">
    <slot />
  </button>
</template>
<script>
export default {
  name: 'AppButton',
};
</script>
<style scoped lang="scss">
.app-button {
  text-transform: uppercase;
  white-space: nowrap;
  font-weight: 600;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
}
</style>
