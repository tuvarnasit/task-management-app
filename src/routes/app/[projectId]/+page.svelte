<script>
  import * as Popover from '$shadcn/popover/index.js';
  import * as DropdownMenu from '$shadcn/dropdown-menu/index.js';
  import * as Dialog from '$shadcn/dialog/index.js';
  import * as Avatar from '$shadcn/avatar/index.js';
  import { EllipsisVertical, ListTodo, SquarePlus, UserPlus, Search } from 'lucide-svelte';
  import { Button } from '$shadcn/button/index.js';
  import { Label } from '$shadcn/label/index.js';
  import { Input } from '$shadcn/input/index.js';
  import { ScrollArea } from '$shadcn/scroll-area/index.js';
  import { enhance } from '$app/forms';
  import ProjectDropdown from '$components/projectDropdown.svelte';
  import { dndzone } from 'svelte-dnd-action';
  import SectionCard from '$components/sectionCard.svelte';
  import { flip } from 'svelte/animate';
  import {  expoInOut } from 'svelte/easing';

  export let data;
  export let form;
  let isSectionPopoverOpen = false;
  let isTaskPopoversOpen = {};
  data.project.sections.forEach((s) => {
    isTaskPopoversOpen[s.id] = false;
  });
  let updateTitle = data.project.title;
  let userSearch = '';
  let updateIsFavorite = data.project.isFavorite ? 'yes' : 'no';

  $: ({ id, title, isFavorite } = data.project);

  async function saveChanges() {
    await fetch('/api/sections', {
      method: 'PATCH',
      body: JSON.stringify({ sections: data.project.sections, projectId: data.project.id }),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  function handleItemFinalize(columnIdx, newTasks) {
    data.project.sections[columnIdx].tasks = newTasks;
    saveChanges();
  }

  function handleSectionConsider(event) {
    data.project.sections = event.detail.items;
  }

  function handleSectionFinalize(event) {
    data.project.sections = event.detail.items;
    saveChanges();
  }
</script>

<svelte:head>
  <title>{data.project.title} | todo.bg</title>
</svelte:head>

<div class="flex flex-col gap-4 overflow-y-visible py-4">
  <div class="flex flex-wrap items-center">
    <form
      action="/app/{data.project.id}?/updateProject"
      class="flex flex-1 items-center gap-2"
      method="POST"
      use:enhance={() => {
        return async ({ update }) => {
          await update({ reset: false });
        };
      }}
    >
      <span class="text-primary">
        <ListTodo size={30} />
      </span>
      <Input
        bind:value={updateTitle}
        name="title"
        class="w-48 overflow-x-hidden overflow-ellipsis border-none pl-2 text-xl font-bold shadow-none transition-shadow duration-150 ease-in-out hover:ring-1 hover:ring-border hover:ring-offset-2 sm:w-full"
        type="text"
        required
      />
      <input hidden bind:value={updateIsFavorite} name="addToFavorites" />
      <input type="submit" hidden />
    </form>
    <div class="flex">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="ghost" class="flex gap-2 text-muted-foreground">
            <UserPlus size={24} />
            Споделяне
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <div class="flex flex-col gap-2">
            <Label>Имейл на съотборник</Label>
            <form
              class="flex gap-2"
              action="?/findUsersByEmail"
              method="POST"
              use:enhance={() =>
                async ({ update }) => {
                  await update({ reset: false });
                }}
            >
              <Input type="text" name="email" required bind:value={userSearch} />
              <Button class="flex items-center gap-1" type="submit">
                <Search size={18} />
                Търси
              </Button>
            </form>
          </div>
          <div class="flex flex-col">
            {#if !form || !form.usersFound}
              <p class="text-muted-foreground">
                Въведи имейл на съотборник и натисни бутона за търсене.
              </p>
            {:else if form.usersFound.length === 0}
              <p class="text-muted-foreground">Няма намерени резултати.</p>
            {:else}
              <ScrollArea class="max-h-32 rounded-md border border-border px-4 py-2">
                {#each form.usersFound as user (user.id)}
                  <div class="flex items-center gap-2">
                    <Avatar.Root>
                      <Avatar.Image
                        src="https://ui-avatars.com/api/?name={user.name}&background=random"
                      />
                      <Avatar.Fallback>{user.initials}</Avatar.Fallback>
                    </Avatar.Root>
                    <div class="flex flex-1 flex-col gap-0">
                      <p>{user.name}</p>
                      <small class="text-muted-foreground">{user.email}</small>
                    </div>
                    <form action="?/addCollaborator" method="POST" use:enhance>
                      <input type="text" hidden name="collaboratorId" value={user.id} />
                      <Button variant="secondary" type="submit">Добави</Button>
                    </form>
                  </div>
                {/each}
              </ScrollArea>
            {/if}
          </div>
        </Dialog.Content>
      </Dialog.Root>
      <ProjectDropdown {id} {title} {isFavorite}>
        <DropdownMenu.Trigger class="text-muted-foreground ">
          <Button variant="ghost" size="icon" class="text-muted-foreground">
            <EllipsisVertical size={18} />
          </Button>
        </DropdownMenu.Trigger>
      </ProjectDropdown>
    </div>
  </div>
  <div
    class="flex flex-wrap items-start justify-center gap-12 p-2 pb-8 sm:flex-nowrap sm:justify-start sm:gap-4 sm:!overflow-auto sm:overflow-x-scroll"
  >
    <div
      class="flex flex-wrap items-start justify-center gap-8 sm:flex-nowrap sm:justify-start sm:gap-4"
      use:dndzone={{ items: data.project.sections, type: 'section', dropTargetStyle: '' }}
      on:finalize={handleSectionFinalize}
      on:consider={handleSectionConsider}
    >
      {#each data.project.sections as { id, name, tasks }, idx (id)}
        <div animate:flip={{ duration: 150, easing: expoInOut }}>
          <SectionCard
            {id}
            {name}
            {tasks}
            {isTaskPopoversOpen}
            onDrop={(newTasks) => handleItemFinalize(idx, newTasks)}
          />
        </div>
      {/each}
    </div>
    <Popover.Root bind:open={isSectionPopoverOpen}>
      <Popover.Trigger>
        <Button variant="muted" class="flex w-full min-w-56 justify-start gap-2 sm:w-72">
          <SquarePlus strokeWidth={1} />
          <div>Добави секция</div>
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <form
          on:submit={() => (isSectionPopoverOpen = false)}
          action="?/createSection"
          method="POST"
          use:enhance
        >
          <div class="grid gap-4">
            <Label for="sectionName" class="font-bold">Име на секцията</Label>
            <Input id="sectionName" name="sectionName" type="text" required />
            <Button type="submit">Добави</Button>
          </div>
        </form>
      </Popover.Content>
    </Popover.Root>
  </div>
</div>
