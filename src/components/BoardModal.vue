<template>
  <AppModal :active="active">
    <div class="header">
      <h3>Add Board</h3>
      <button @click="$emit('toggle-modal')" class="button">&#x2715;</button>
    </div>
    <div class="body">
      <AppInput v-model="boardTitle" />
      <label>
        Choose color:
        <input type="color" v-model="color" />
      </label>
    </div>
    <button
      class="footer"
      @click="onSubmit"
      :disabled="!isValid"
      :class="{ '-valid': isValid }"
    >
      Submit
    </button>
  </AppModal>
</template>
<script>
import { getRandomId } from '@/utils/common';
export default {
  name: 'BoardModal',
  props: ['active'],
  emits: ['toggle-modal', 'add-board'],
  data() {
    return {
      boardTitle: '',
      color: '#000000',
      isValid: false,
    };
  },
  methods: {
    onSubmit() {
      this.$emit('add-board', {
        id: getRandomId(),
        title: this.boardTitle,
        color: this.color,
        createdDate: new Date().toUTCString(),
        tasks: [],
      });
      this.$emit('toggle-modal');
      this.boardTitle = '';
      this.color = '#fff';
    },
  },
  watch: {
    boardTitle(newVal) {
      if (!newVal) this.isValid = false;
      else this.isValid = true;
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .button {
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  }
}
.footer {
  text-transform: uppercase;
  width: 100%;
  margin-top: 12px;
  border: none;
  font-weight: 600;
  padding: 12px 0px;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.26);
  background-color: rgba(0, 0, 0, 0.12);
  cursor: not-allowed;
  &:hover {
    opacity: 0.8;
  }
  &.-valid {
    background-color: #1976d2;
    color: white;
    cursor: pointer;
  }
}
</style>
