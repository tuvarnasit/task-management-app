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
      isFavorite: false,
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
  },
  deleteProject: async ({ params, request }) => {
    const data = await request.formData();

    let remove = [];

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === params.projectId) {
        remove.push(i);
      }
    }

    let removed = 0;
    for (let idx of remove) {
      projects.splice(idx - removed, 1);
      removed += 1;
    }
    console.log(projects);
    throw redirect(302, `/app`);
  },
  updateProject: async ({ params, request }) => {
    const data = await request.formData();
    const project = projects.find((p) => p.id === params.projectId);
    const idx = projects.indexOf(project);
    projects[idx].title = data.get('title');
    projects[idx].isFavorite = data.get('addToFavorites') === 'yes';
  }
};
