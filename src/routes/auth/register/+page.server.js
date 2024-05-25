import { users } from '$server/users.js';
import { fail, redirect } from '@sveltejs/kit';
import { projects } from '$server/projects.js';
import { createId } from '$server/cuid.js';

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const user = {
      id: crypto.randomUUID(),
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
    projects.push({
      id: createId(),
      ownerId: user.id,
      title: 'Първи Стъпки',
      collaboratorIds: [],
      sections: [
        {
          id: createId(),
          name: 'Задачи',
          tasks: [
            {
              id: createId(),
              name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elementum ipsum. Suspendisse scelerisque bibendum purus, sit amet gravida lectus viverra id. Donec ac efficitur elit. Suspendisse porta, metus sit amet dictum elementum, neque mauris mollis urna, in fringilla velit lorem eget elit.'
            }
          ]
        }
      ]
    });
    cookies.set('user', JSON.stringify(user), {secure: false, path: '/' });
    return redirect(303, '/app');
  }
};
