import { users } from '$lib/server/users.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const user = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password')
    };
    if (users.find((u) => u.email.toLowerCase() === user.email.toLowerCase())) {
      return fail(422, {
        error: 'Вече съществува акаунт с този имейл адрес.'
      });
    }
    users.push(user);
    return redirect(303, '/app');
  }
};
