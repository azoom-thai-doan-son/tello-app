<template>
  <div class="task-wrapper" :style="{ backgroundColor: task.color }">
    <div class="header">
      <h3>{{ task.name }}</h3>
      <img
        :src="require('@/assets/images/trash-icon.svg')"
        class="icon"
        width="12"
        height="12"
        @click="$emit('delete-task', task)"
      />
    </div>
    <div class="body">
      <SubtaskItem
        v-for="subtask in subtasks"
        :subtask="subtask"
        :key="subtask.id"
        @toggle-modal="toggleSubtaskModal"
      />
    </div>
    <AppButton @click.native="toggleSubtaskModal()">add subtask</AppButton>
    <SubtaskModal
      :active="isShowSubtaskModal"
      :task="task"
      :isEditing="isEditingSubtask"
      :editedSubtask="editedSubtask"
      @toggle="toggleSubtaskModal"
      @add-subtask="addSubtask"
      @delete-subtask="deleteSubtask"
      @edit-subtask="editSubtask"
    />
  </div>
</template>
<script>
import { getItemFromStorage, setItemToStorage } from '@/utils/common';
import SubtaskItem from './SubtaskItem.vue';
import SubtaskModal from './SubtaskModal.vue';
export default {
  name: 'TaskItem',
  props: ['task'],
  emits: ['delete-task'],
  components: { SubtaskItem, SubtaskModal },
  data() {
    return {
      isShowSubtaskModal: false,
      isEditingSubtask: false,
      editedSubtask: null,
      subtasks: [],
      allSubtasks: [],
    };
  },
  methods: {
    toggleSubtaskModal(subtask = undefined) {
      if (subtask === undefined) this.isEditingSubtask = false;
      else {
        this.isEditingSubtask = true;
        this.editedSubtask = subtask;
      }
      this.isShowSubtaskModal = !this.isShowSubtaskModal;
    },
    addSubtask(newSubtask) {
      this.subtasks.push(newSubtask);
      this.allSubtasks.push(newSubtask);
      setItemToStorage('subtasks', this.allSubtasks);
    },
    deleteSubtask(subtaskId) {
      this.subtasks = this.subtasks.filter(
        (subtask) => subtask.id !== subtaskId
      );
      this.allSubtasks = this.allSubtasks.filter(
        (subtask) => subtask.id !== subtaskId
      );
      setItemToStorage('subtasks', this.allSubtasks);
    },
    editSubtask(editedSubtask) {
      const found = this.subtasks.find(
        (subtask) => subtask.id === editedSubtask.id
      );
      found.name = editedSubtask.name;
    },
  },
  created() {
    const allSubtasks = getItemFromStorage('subtasks') || [];
    this.allSubtasks = allSubtasks;
    this.subtasks = allSubtasks.filter(
      (subtask) => subtask.taskId === this.task.id
    );
  },
};
</script>
<style scoped lang="scss">
.task-wrapper {
  height: 90%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 8px 16px;

  > .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      cursor: pointer;
    }
  }
  > .body {
    flex-grow: 1;
    margin: 12px 0;
    height: 400px;
    overflow: auto;
  }
}
</style>
