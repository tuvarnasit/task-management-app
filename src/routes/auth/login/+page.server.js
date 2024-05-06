import { fail, redirect } from '@sveltejs/kit';
import { users } from '$server/users.js';

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      return fail(401, {
        email: email,
        error: 'Неправилен имейл адрес или парола. '
      });
    }
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    };
    cookies.set('user', JSON.stringify(userData), { path: '/' });
    return redirect(303, '/app');
  }
};
