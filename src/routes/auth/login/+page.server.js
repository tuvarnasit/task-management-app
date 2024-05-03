import { fail, redirect } from '@sveltejs/kit';
import { users } from '$server/users.js';

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    console.log(email, password);
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      console.log('failed');
      return fail(401, {
        email: email,
        error: 'Неправилен имейл адрес или парола. '
      });
    }
    cookies.set('user', JSON.stringify(user), { path: '/' });
    return redirect(303, '/app');
  }
};
