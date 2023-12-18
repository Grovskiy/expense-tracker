import { defineStore } from 'pinia';

interface APIBody {
  todos: [];
}
export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [],
  }),
  actions: {
    async fetchTodos() {
      const { data } = await useFetch<APIBody>('https://dummyjson.com/todos');
      if (data.value) {
        this.todos = data.value.todos;
      }
    },
  },
});
