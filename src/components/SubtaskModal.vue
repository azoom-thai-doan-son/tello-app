<template>
  <AppModal :active="active" class="subtask-modal">
    <h2 class="name">Subtask name</h2>
    <AppInput
      v-if="!isEditing"
      v-model="subtaskName"
      label="Stuff to do"
      @keydown.native.enter="addSubtask"
    />
    <AppInput
      v-else
      v-model="editedSubtaskName"
      label="Edit title"
      @keydown.native.enter="editSubtask"
    />

    <div class="footer">
      <AppButton v-if="isEditing" @click.native="deleteSubtask"
        >delete</AppButton
      >
      <AppButton @click.native="closeModal">cancel</AppButton>
      <AppButton @click.native="modifySubtask">save</AppButton>
    </div>
  </AppModal>
</template>
<script>
import { getRandomId } from '@/utils/common';

export default {
  name: 'SubtaskModal',
  props: ['active', 'task', 'isEditing', 'editedSubtask'],
  emits: ['toggle', 'add-subtask', 'edit-subtask'],
  data() {
    return {
      subtaskName: '',
      // editedSubtaskName: '',
      editedName: '',
    };
  },
  computed: {
    editedSubtaskName: {
      get() {
        return this.editedSubtask.name;
      },
      set(newVal) {
        this.editedName = newVal;
      },
    },
  },
  methods: {
    closeModal() {
      this.subtaskName = '';
      this.$emit('toggle');
    },
    modifySubtask() {
      if (this.isEditing) this.editSubtask();
      else this.addSubtask();
    },
    addSubtask() {
      const newSubtask = {
        id: getRandomId(),
        taskId: this.task.id,
        name: this.subtaskName,
      };
      this.$emit('add-subtask', newSubtask);
      this.closeModal();
    },
    deleteSubtask() {
      this.$emit('delete-subtask', this.editedSubtask.id);
      this.closeModal();
    },
    editSubtask() {
      this.$emit('edit-subtask', {
        ...this.editedSubtask,
        name: this.editedName,
      });
      this.closeModal();
    },
  },
};
</script>
<style scoped lang="scss">
.name {
  margin-bottom: 16px;
}
.footer {
  display: flex;
  gap: 8px;
  justify-content: end;
  margin-top: 30px;
}
</style>
