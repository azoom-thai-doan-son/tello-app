<template>
  <div class="home-page">
    <AppHeader />
    <div class="body">
      <div class="top-section">
        <h1>My Boards</h1>
        <button class="button" @click="toggleModal">Add board</button>
      </div>
      <main class="board-list">
        <BoardItem v-for="board in boards" :key="board.id" v-bind="board" />
      </main>
      <BoardModal
        :active="isShowModal"
        @add-board="addBoard"
        @toggle-modal="toggleModal"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import BoardItem from '@/components/BoardItem.vue';
import BoardModal from '@/components/BoardModal.vue';
export default {
  name: 'HomeView',
  components: {
    BoardItem,
    BoardModal,
  },
  data() {
    return {
      boards: [],
      isShowModal: false,
    };
  },
  methods: {
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },
    addBoard(board) {
      localStorage.setItem('boards', JSON.stringify([...this.boards, board]));
      this.boards.push(board);
    },
    getBoards() {
      return JSON.parse(localStorage.getItem('boards')) ?? [];
    },
  },
  created() {
    this.boards = this.getBoards();
  },
};
</script>

<style scoped lang="scss">
.body {
  padding: 12px 16px;
}
.top-section {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  .button {
    text-transform: uppercase;
    font-weight: 600;
    border: 0;
    border-radius: 8px;
    padding: 8px 16px;
    transition: all 0.4s;
    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
}
.board-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
