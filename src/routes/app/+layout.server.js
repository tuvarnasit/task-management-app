import { projects } from '$lib/server/projects.js';
import { users } from '$lib/server/users.js';

export async function load({ cookies }) {
  const userId = JSON.parse(cookies.get('user')).id;

  const user = users.find((u) => u.id === userId);
  const userProjects = projects
    .filter((p) => p.ownerId === userId)
    .map((p) => ({ id: p.id, title: p.title, isFavorite: p.isFavorite }));

  const favoriteProjects = userProjects.filter((p) => p.isFavorite === true);

  const sharedProjects = projects.filter((p) => p.collaboratorIds.includes(userId));

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      name: user.firstName + ' ' + user.lastName,
      initials: user.firstName.charAt(0) + user.lastName.charAt(0)
    },
    projects: userProjects,
    favoriteProjects: favoriteProjects,
    sharedProjects: sharedProjects
  };
}
