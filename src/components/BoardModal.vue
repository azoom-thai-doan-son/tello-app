<template>
  <div class="modal-mask" v-show="active">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="header">
          <h3>Add Board</h3>
          <button @click="$emit('toggle-modal')" class="button">
            &#x2715;
          </button>
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
      </div>
    </div>
  </div>
</template>
<script>
import AppInput from '@/components/AppInput.vue';
export default {
  name: 'BoardModal',
  props: ['active'],
  emits: ['toggle-modal', 'add-board'],
  components: { AppInput },
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
        id: Math.random(),
        title: this.boardTitle,
        color: this.color,
        createdDate: new Date().toUTCString(),
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
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
}
</style>
