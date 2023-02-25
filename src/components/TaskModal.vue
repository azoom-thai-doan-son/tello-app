<template>
  <AppModal :active="active" class="task-modal">
    <h2 class="taskname">Task name</h2>
    <AppInput
      v-model="taskName"
      label="Stuff to do"
      @keydown.native.enter="addTask"
    />
    <div class="footer">
      <AppButton @click.native="closeModal">cancel</AppButton>
      <AppButton @click.native="addTask">save</AppButton>
    </div>
  </AppModal>
</template>
<script>
import { getRandomId } from '@/utils/common';
export default {
  name: 'TaskModal',
  props: ['active', 'boardId'],
  emits: ['add-task', 'toggle'],
  data() {
    return {
      taskName: '',
    };
  },
  methods: {
    addTask() {
      const newTask = {
        id: getRandomId(),
        name: this.taskName,
        boardId: this.boardId,
      };

      this.$emit('add-task', newTask);
      this.closeModal();
    },
    closeModal() {
      this.$emit('toggle');
      this.taskName = '';
    },
  },
};
</script>

<style scoped lang="scss">
.taskname {
  margin-bottom: 16px;
}
.footer {
  display: flex;
  gap: 8px;
  justify-content: end;
  margin-top: 30px;
}
</style>
