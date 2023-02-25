<template>
  <div class="app-header">
    <h2 class="title">My Tello</h2>
    <img
      v-if="isBoardPage"
      :src="require('@/assets/images/trash-icon.svg')"
      width="12"
      height="12"
      @click="$emit('delete-board')"
      class="icon"
    />
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  emits: ['delete-board'],
  props: {
    isBoardPage: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.app-header {
  background-color: #d3a1eb;
  text-align: center;
  > .title {
    padding: 8px;
    font-style: italic;
    flex-grow: 1;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  > .icon {
    cursor: pointer;
  }
}
</style>
