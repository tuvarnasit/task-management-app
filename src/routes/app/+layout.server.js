import { projects } from '$lib/server/projects.js';

export async function load({ cookies }) {
  const userId = JSON.parse(cookies.get('user')).id;
  const userProjects = projects
    .filter((p) => p.ownerId === userId)
    .map((p) => ({ id: p.id, title: p.title, isFavorite: p.isFavorite }));
  const favoriteProjects = userProjects.filter((p) => p.isFavorite === true);
  return {
    projects: userProjects,
    favoriteProjects: favoriteProjects
  };
}
