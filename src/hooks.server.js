import { users } from '$lib/server/users.js';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
  const reqPath = event.url.pathname;
  const cookies = event.cookies;
  if (!validateCookies(cookies) && reqPath.includes('/app')) {
    event.cookies.set('user', '', { path: '/' });
    throw redirect(303, '/auth/login');
  }

  const response = await resolve(event);
  return response;
};

function validateCookies(cookies) {
  const userCookie = cookies.get('user');
  if (!userCookie) {
    return false;
  }

  const user = parseUserFromCookie(userCookie);
  const userInDb = users.find((u) => JSON.stringify(u) === JSON.stringify(user));
  if (!userInDb) {
    return false;
  }
  return true;
}

function parseUserFromCookie(cookieString) {
  return JSON.parse(cookieString);
}
