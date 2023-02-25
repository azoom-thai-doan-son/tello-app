<template>
  <div class="board-page" :style="{ backgroundColor: board.color }">
    <AppHeader is-board-page @delete-board="deleteBoard" />
    <div class="top-section">
      <h2 class="title">{{ board.title }}</h2>
      <p>{{ board.createdDate }}</p>
    </div>
    <div class="main-section">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :tasks="tasks"
        @delete-task="deleteTask"
      />
      <AppButton @click.native="toggleTaskModal"> add new task </AppButton>
    </div>
    <TaskModal
      :active="isShowTaskModal"
      :boardId="board.id"
      @toggle="toggleTaskModal"
      @add-task="addTask"
    />
  </div>
</template>
<script>
import TaskItem from '@/components/TaskItem.vue';
import TaskModal from '@/components/TaskModal.vue';
import {
  getItemFromStorage,
  getTasksByBoardId,
  setItemToStorage,
} from '@/utils/common';
export default {
  name: 'BoardView',
  components: { TaskItem, TaskModal },
  props: ['boardId'],
  data() {
    return {
      board: {},
      tasks: [],
      isShowTaskModal: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    const boardId = to.params.boardId;
    const boards = JSON.parse(localStorage.getItem('boards')) ?? [];
    const boardIndex = boards.findIndex((board) => +board.id === +boardId);
    if (boardIndex !== -1)
      return next((vm) => {
        vm.board = boards[boardIndex];
      });
    next({ name: 'NotFound' });
  },
  beforeRouteUpdate(to, from, next) {
    const boardId = to.params.boardId;
    const boards = JSON.parse(localStorage.getItem('boards')) ?? [];
    const boardIndex = boards.findIndex((board) => +board.id === +boardId);
    if (boardIndex !== -1)
      return next((vm) => {
        vm.board = boards[boardIndex];
      });
    next({ name: 'NotFound' });
  },
  mounted() {
    const header = document.querySelector('.app-header');
    header.style.backgroundColor = this.board.color;
  },
  destroyed() {
    const header = document.querySelector('.app-header');
    header.style.backgroundColor = '#d3a1eb';
  },
  methods: {
    deleteBoard() {
      let allBoards = getItemFromStorage('boards');
      allBoards = allBoards.filter((board) => board.id !== this.board.id);
      setItemToStorage('boards', allBoards);
      this.$router.push({ name: 'Home' });
    },
    toggleTaskModal() {
      this.isShowTaskModal = !this.isShowTaskModal;
    },
    addTask(newTask) {
      const allTasks = getItemFromStorage('tasks') ?? [];
      allTasks.push(newTask);
      setItemToStorage('tasks', allTasks);
      this.tasks.push(newTask);
    },
    deleteTask(deletedTask) {
      this.tasks = this.tasks.filter((task) => task.id !== deletedTask.id);
      let allTasks = getItemFromStorage('tasks');
      allTasks = allTasks.filter((task) => task.id !== deletedTask.id);
      setItemToStorage('tasks', allTasks);

      // delete all subtasks belong to deleted task.
      let allSubtasks = getItemFromStorage('subtasks');
      allSubtasks = allSubtasks.filter(
        (subtask) => subtask.taskId !== deletedTask.id
      );
      setItemToStorage('subtasks', allSubtasks);
    },
  },
  created() {
    this.tasks = getTasksByBoardId(this.boardId);
  },
};
</script>

<style scoped lang="scss">
.board-page {
  flex-grow: 1;
  padding: 0 16px;
}
.top-section {
  > .title {
    margin-bottom: 12px;
  }
  margin-bottom: 16px;
}
.main-section {
  height: calc(100vh - 100px);
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
</style>
