import { projects } from '$lib/server/projects.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { createId } from '$lib/server/cuid.js';

export async function load({ params, cookies }) {
  const userId = JSON.parse(cookies.get('user')).id;
  const project = projects.find((p) => p.ownerId === userId && p.id === params.projectId);

  if (!project) {
    throw error(404, 'Тази страница не съществува');
  }
  return { project };
}

export const actions = {
  createProject: async ({ cookies, request }) => {
    const data = await request.formData();
    const userId = JSON.parse(cookies.get('user')).id;
    const project = {
      id: createId(),
      ownerId: userId,
      title: data.get('projectTitle'),
      collaboratorsIds: [],
      sections: []
    };
    projects.push(project);
    throw redirect(302, `/app/${project.id}`);
  },
  createSection: async ({ params, request }) => {
    const data = await request.formData();
    const project = projects.find((p) => p.id === params.projectId);
    const section = {
      id: createId(),
      name: data.get('sectionName'),
      tasks: []
    };
    project.sections.push(section);
  }
};
