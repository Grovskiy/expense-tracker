export default defineEventHandler(async event => {
    const { firstName, lastName, email, password } = await readBody(event);

    return await $fetch('http://localhost:5001/api/Authentication/sign-up', {
        method: 'post',
        body: {
            firstName,
            lastName,
            email,
            password,
        },
    });
});
