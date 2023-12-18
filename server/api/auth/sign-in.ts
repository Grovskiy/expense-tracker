export default defineEventHandler(async event => {
    const { email, password } = await readBody(event);

    return await $fetch('http://localhost:5001/api/Authentication/sign-in', {
        method: 'post',
        body: {
            email,
            password,
        },
    });
});
