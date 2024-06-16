import { projects } from '$lib/server/projects.js';
import { error, redirect } from '@sveltejs/kit';
import { createId } from '$lib/server/cuid.js';
import { users } from '$lib/server/users.js';

export async function load({ params, cookies }) {
  const userId = JSON.parse(cookies.get('user')).id;
  const project = projects.find(
    (p) => (p.ownerId === userId || p.collaboratorIds.includes(userId)) && p.id === params.projectId
  );

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
      collaboratorIds: [],
      sections: []
    };
    projects.push(project);
    throw redirect(302, `/app/${project.id}`);
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
    throw redirect(302, `/app`);
  },
  updateProject: async ({ params, request }) => {
    const data = await request.formData();
    const idx = projects.findIndex((p) => p.id === params.projectId);
    projects[idx].title = data.get('title');
    projects[idx].isFavorite = data.get('addToFavorites') === 'yes';
  },
  createSection: async ({ params, request }) => {
    const data = await request.formData();
    const project = projects.find((p) => p.id === params.projectId);
    const section = {
      id: createId(),
      name: data.get('sectionName'),
      tasks: [],
      completedTasks: []
    };
    project.sections.push(section);
  },
  updateSection: async ({ params, request }) => {
    const data = await request.formData();
    const project = projects.find((p) => p.id === params.projectId);
    const section = project.sections.find((s) => s.id === data.get('sectionId'));
    section.name = data.get('sectionName');
  },
  deleteSection: async ({ params, request }) => {
    const data = await request.formData();
    const project = projects.find((p) => p.id === params.projectId);

    let remove = [];

    for (let i = 0; i < project.sections.length; i++) {
      if (project.sections[i].id === data.get('sectionId')) {
        remove.push(i);
      }
    }

    let removed = 0;
    for (let idx of remove) {
      project.sections.splice(idx - removed, 1);
      removed += 1;
    }
  },
  createTask: async ({ params, request }) => {
    const data = await request.formData();
    const project = projects.find((p) => p.id === params.projectId);
    const section = project.sections.find((s) => s.id === data.get('sectionId'));
    const task = {
      id: createId(),
      name: data.get('taskName')
    };
    section.tasks.push(task);
  },
  appendTaskToProject: async ({ params, request }) => {
    const data = await request.formData();

    const project = projects.find((p) => p.id === params.projectId);
    if (project.sections.length == 0 || !project.sections.find((s) => s.name === '(Без име)')) {
      project.sections.push({
        id: createId(),
        name: '(Без име)',
        tasks: []
      });
    }

    project.sections
      .find((s) => s.name === '(Без име)')
      .tasks.push({
        id: createId(),
        name: data.get('taskName')
      });

    throw redirect(302, `/app/${project.id}`);
  },
  completeTask: async ({ params, request }) => {
    const data = await request.formData();
    const project = projects.find((p) => p.id === params.projectId);
    const section = project.sections.find((s) => s.id === data.get('sectionId'));
    const idx = section.tasks.findIndex((t) => t.id === data.get('taskId'));
    const task = section.tasks[idx];
    let remove = [];

    for (let i = 0; i < section.tasks.length; i++) {
      if (section.tasks[i].id === data.get('taskId')) {
        remove.push(i);
      }
    }

    let removed = 0;
    for (let idx of remove) {
      section.tasks.splice(idx - removed, 1);
      removed += 1;
    }

    section.completedTasks.push(task);
  },
  undoCompleteTask: async ({ params, request }) => {
    const data = await request.formData();
    const project = projects.find((p) => p.id === params.projectId);
    const section = project.sections.find((s) => s.id === data.get('sectionId'));
    const idx = section.completedTasks.findIndex((t) => t.id === data.get('taskId'));
    const task = section.completedTasks[idx];
    let remove = [];

    for (let i = 0; i < section.completedTasks.length; i++) {
      if (section.completedTasks[i].id === data.get('taskId')) {
        remove.push(i);
      }
    }

    let removed = 0;
    for (let idx of remove) {
      section.completedTasks.splice(idx - removed, 1);
      removed += 1;
    }

    section.tasks.push(task);
  },
  addCollaborator: async ({ params, request }) => {
    const data = await request.formData();
    const project = projects.find((p) => p.id === params.projectId);

    project.collaboratorIds.push(data.get('collaboratorId'));
  },
  deleteTask: async ({ params, request }) => {
    const data = await request.formData();
    const project = projects.find((p) => p.id === params.projectId);
    const section = project.sections.find((s) => s.id === data.get('sectionId'));

    let remove = [];

    for (let i = 0; i < section.tasks.length; i++) {
      if (section.tasks[i].id === data.get('taskId')) {
        remove.push(i);
      }
    }

    let removed = 0;
    for (let idx of remove) {
      section.tasks.splice(idx - removed, 1);
      removed += 1;
    }

    remove = [];

    for (let i = 0; i < section.completedTasks.length; i++) {
      if (section.completedTasks[i].id === data.get('taskId')) {
        remove.push(i);
      }
    }

    removed = 0;
    for (let idx of remove) {
      section.completedTasks.splice(idx - removed, 1);
      removed += 1;
    }
  },
  findUsersByEmail: async ({ params, request, cookies }) => {
    const userId = JSON.parse(cookies.get('user')).id;
    const data = await request.formData();
    const project = projects.find((p) => p.id === params.projectId);

    const usersFound = users.filter(
      (u) =>
        u.email.includes(data.get('email')) &&
        u.id !== userId &&
        !project.collaboratorIds.includes(u.id)
    );
    return {
      usersFound: usersFound.map((u) => ({
        name: u.firstName + ' ' + u.lastName,
        id: u.id,
        email: u.email,
        initials: u.firstName?.charAt(0) + u.lastName.charAt(0)
      }))
    };
  }
};
