import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  cookies.set('user', '', { path: '/' });
  throw redirect(302, '/auth/login');
}
