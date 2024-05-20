import { users } from '$lib/server/users.js';
import { projects } from '$lib/server/projects.js';

export async function PATCH({ request, cookies }) {
  const data = await request.json();
  const userId = JSON.parse(cookies.get('user')).id;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    throw Error('You need to log in!');
  }

  const project = projects.find((p) => p.id === data.projectId && p.ownerId === user.id);

  if (!project) {
    throw Error("Project doesn't exist or you are not allowed to view this project!");
  }

  project.sections = data.sections;
  return new Response(null, { status: 204 });
}
