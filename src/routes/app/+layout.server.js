import { projects } from '$lib/server/projects.js';

export async function load({ cookies }) {
  const userId = JSON.parse(cookies.get('user')).id;
  const userProjects = projects
    .filter((p) => p.ownerId === userId)
    .map((p) => ({ id: p.id, title: p.title }));
  return {
    projects: userProjects
  };
}
