export default defineEventHandler(async () => {
    return await $fetch('http://localhost:5001/api/Expense/test', {
        method: 'post',
    });
});
