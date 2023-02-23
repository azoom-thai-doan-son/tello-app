<template>
  <div class="board-item" :style="{ backgroundColor: color }">
    <h3 class="title">{{ title }}</h3>
    <p class="time">created on {{ createdDate }}</p>
  </div>
</template>
<script>
export default {
  name: 'BoardItem',
  props: ['title', 'createdDate', 'color'],
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
