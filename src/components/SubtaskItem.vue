<template>
  <div class="sub-task" @click="$emit('toggle-modal', subtask)">
    {{ subtask.name }}
  </div>
</template>
<script>
export default {
  name: 'SubtaskItem',
  props: ['subtask'],
  emits: ['toggle-modal'],
};
</script>
<style lang="scss" scoped>
.sub-task {
  cursor: pointer;
  padding: 14px 12px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 12px;
}
</style>
