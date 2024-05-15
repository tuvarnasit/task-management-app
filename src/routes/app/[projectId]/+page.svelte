<script>
  import * as Card from '$shadcn/card/index.js';
  import * as Popover from '$shadcn/popover/index.js';
  import * as DropdownMenu from '$shadcn/dropdown-menu/index.js';
  import * as Dialog from '$shadcn/dialog/index.js';
  import * as Avatar from '$shadcn/avatar/index.js';
  import {
    Check,
    EllipsisVertical,
    ListTodo,
    SquarePlus,
    UserPlus,
    Search,
    Trash2
  } from 'lucide-svelte';
  import { Button } from '$shadcn/button/index.js';
  import { Label } from '$shadcn/label/index.js';
  import { Input } from '$shadcn/input/index.js';
  import { Textarea } from '$shadcn/textarea/index.js';
  import { ScrollArea } from '$shadcn/scroll-area/index.js';
  import { toast } from 'svelte-sonner';
  import { enhance } from '$app/forms';
  import ProjectDropdown from '$components/projectDropdown.svelte';
  import SectionDropdown from '$components/sectionDropdown.svelte';
  import DeleteTaskButton from '$components/deleteTaskButton.svelte';

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
</script>

<svelte:head>
  <title>{data.project.title} | todo.bg</title>
</svelte:head>

<div class="flex flex-col gap-4 overflow-y-visible py-4">
  <div class="flex items-center">
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
        class="border-none pl-2 text-xl font-bold shadow-none transition-shadow duration-150 ease-in-out hover:ring-1 hover:ring-border hover:ring-offset-2"
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
  <div class="flex items-start gap-4">
    {#each data.project.sections as section (section.id)}
      <Card.Root
        class="max-h-full w-72 min-w-64 border-none bg-background shadow-none ring-border ring-offset-background transition-all duration-150 ease-in-out hover:ring-1 hover:ring-offset-2"
      >
        <Card.Header class="group px-3 py-3 pt-2">
          <Card.Title tag="h2" class="text-md flex items-center gap-2"
            >{section.name}
            <div class="flex-1 align-bottom text-sm text-muted-foreground/70">
              {section.tasks.filter((t) => !t.isCompleted).length}
            </div>
            <SectionDropdown id={section.id} name={section.name}>
              <DropdownMenu.Trigger class="text-muted-foreground ">
                <Button
                  variant="ghost"
                  size="icon"
                  class="invisible text-muted-foreground group-hover:visible"
                >
                  <EllipsisVertical size={18} />
                </Button>
              </DropdownMenu.Trigger>
            </SectionDropdown>
          </Card.Title>
        </Card.Header>
        <ScrollArea class="flex max-h-[63lvh] flex-col rounded-md">
          <Card.Content class="flex flex-col gap-2 px-3">
            {#each section.tasks.filter((t) => !t.isCompleted) as task (task.id)}
              <Card.Root tag="h3" class="bg-background py-3 text-sm">
                <Card.Content class="flex gap-2 px-3">
                  <form
                    action="?/toggleTaskCompleted"
                    method="POST"
                    use:enhance
                    on:submit={() => {
                      if (!task.isCompleted) {
                        toast.success('1 Изпълнена задача');
                      }
                    }}
                  >
                    <input type="text" hidden name="taskId" value={task.id} />
                    <input type="text" hidden name="sectionId" value={section.id} />
                    <Button
                      variant="ghost"
                      class="group flex size-5 items-center justify-center rounded-full border border-border p-[3px] hover:border-primary"
                      type="submit"
                    >
                      <Check
                        class="scale-0 text-primary transition-all duration-150 group-hover:scale-100"
                        strokeWidth={4}
                      />
                    </Button>
                  </form>
                  <div class="flex-1">
                    {task.name}
                  </div>
                  <DeleteTaskButton taskId={task.id} sectionId={section.id} name={task.name} />
                </Card.Content>
              </Card.Root>
            {/each}
            {#each section.tasks.filter((t) => t.isCompleted) as task (task.id)}
              <div>
                <Card.Root tag="h3" class="bg-background py-3 text-sm">
                  <Card.Content class="flex gap-2 px-3 text-muted-foreground line-through">
                    <form action="?/toggleTaskCompleted" method="POST" use:enhance>
                      <input type="text" hidden name="taskId" value={task.id} />
                      <input type="text" hidden name="sectionId" value={section.id} />
                      <Button
                        variant="ghost"
                        class="flex size-5 items-center justify-center rounded-full border border-border bg-muted p-[3px]"
                        type="submit"
                      >
                        <Check
                          class="text-muted-foreground/80 transition-all duration-150"
                          strokeWidth={4}
                        />
                      </Button>
                    </form>
                    <div class="flex-1">
                      {task.name}
                    </div>
                    <DeleteTaskButton taskId={task.id} sectionId={section.id} name={task.name} />
                  </Card.Content>
                </Card.Root>
              </div>
            {/each}
          </Card.Content>
        </ScrollArea>
        <Card.Footer class="px-4 py-2 pt-0">
          <Popover.Root bind:open={isTaskPopoversOpen[section.id]}>
            <Popover.Trigger>
              <Button variant="default" size="sm" class="flex justify-start shadow-sm"
                >Добави задача
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              <form
                action="?/createTask"
                method="POST"
                class="grid gap-4"
                use:enhance
                on:submit={() => (isTaskPopoversOpen[section.id] = false)}
              >
                <Label for="sectionName" class="font-bold">Име на задачата</Label>
                <input type="text" hidden name="sectionId" value={section.id} />
                <Textarea class="resize-none" name="taskName" />
                <Button type="submit">Добави</Button>
              </form>
            </Popover.Content>
          </Popover.Root>
        </Card.Footer>
      </Card.Root>
    {/each}

    <Popover.Root bind:open={isSectionPopoverOpen} portal="null">
      <Popover.Trigger>
        <Button variant="muted" class="flex w-64 min-w-56 justify-start gap-2">
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
