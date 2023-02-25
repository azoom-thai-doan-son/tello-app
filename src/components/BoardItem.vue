<template>
  <router-link :to="{ name: 'Board', params: { boardId: id } }">
    <div class="board-item" :style="{ backgroundColor: color }">
      <h3 class="title">{{ title }}</h3>
      <p class="time">created on {{ createdDate }}</p>
    </div>
  </router-link>
</template>
<script>
export default {
  name: 'BoardItem',
  props: ['title', 'createdDate', 'color', 'id'],
};
</script>
<style scoped lang="scss">
.board-item {
  padding: 12px 12px;
  border-radius: 8px;
  min-width: 200px;
  max-width: 450px;
}
</style>
