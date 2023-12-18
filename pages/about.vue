<script lang="ts" setup>
    import { storeToRefs } from 'pinia';
    import { useTodosStore } from '~/store/todos';
    const store = useTodosStore();

    const { fetchTodos } = store;
    const { todos } = storeToRefs(store);
</script>

<template>
    <div>
        <h1>About Page</h1>
        <ul>
            <li v-for="(item, key) in todos" :key="key">
                {{ item?.todo }}
            </li>
        </ul>
        <button @click="fetchTodos">Download</button>
        <br />
    </div>
</template>
