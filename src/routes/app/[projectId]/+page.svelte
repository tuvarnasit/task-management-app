<script>
  import * as Card from '$shadcn/card/index.js';
  import * as Popover from '$shadcn/popover/index.js';
  import * as DropdownMenu from '$shadcn/dropdown-menu/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Check, EllipsisVertical, ListTodo, SquarePlus } from 'lucide-svelte';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { page } from '$app/stores.js';
  import { enhance } from '$app/forms';
  import ProjectDropdown from '$lib/components/projectDropdown.svelte';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';

  export let data;
  let isSectionPopoverOpen = false;
  let isTaskPopoversOpen = {};
  data.project.sections.forEach((s) => {
    isTaskPopoversOpen[s.id] = false;
  });

  let updateTitle = data.project.title;
  let updateIsFavorite = data.project.isFavorite ? 'yes' : 'no';
  $: ({ id, title, isFavorite } = data.project);
</script>

<svelte:head>
  <title>{data.project.title} | todo.bg</title>
</svelte:head>

<div class="flex flex-col gap-4 overflow-y-visible py-4">
  <form
    class="flex items-center gap-2"
    action="/app/{data.project.id}?/updateProject"
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
    />
    <input hidden bind:value={updateIsFavorite} name="addToFavorites" />
    <input type="submit" hidden />
    <div class="flex">
      <ProjectDropdown {id} {title} {isFavorite}>
        <DropdownMenu.Trigger class="text-muted-foreground ">
          <Button variant="ghost" size="icon">
            <EllipsisVertical size={18} />
          </Button>
        </DropdownMenu.Trigger>
      </ProjectDropdown>
    </div>
  </form>
  <div class="flex items-start gap-6">
    {#each data.project.sections as section (section.id)}
      <Card.Root
        class="max-h-full w-72 min-w-64 border-none bg-background shadow-none ring-border ring-offset-background transition-all duration-150 ease-in-out hover:ring-1 hover:ring-offset-2"
      >
        <Card.Header class="px-3 py-3 pt-2">
          <Card.Title tag="h2" class="text-md flex items-center gap-2"
            >{section.name}
            <div class="align-bottom text-sm text-muted-foreground/70">{section.tasks.length}</div>
          </Card.Title>
        </Card.Header>
        <ScrollArea class="flex max-h-[63lvh] flex-col rounded-md">
          <Card.Content class="flex flex-col gap-2 px-3">
            {#each section.tasks as task (task.id)}
              <Card.Root tag="h3" class="bg-background py-3 text-sm">
                <Card.Content class="flex gap-2 px-3">
                  <form action="?/toggleTaskCompleted" method="POST" use:enhance>
                    <input type="text" hidden name="taskId" value={task.id} />
                    <input type="text" hidden name="sectionId" value={section.id} />
                    <Button
                      variant="ghost"
                      class="group size-5 rounded-full border border-border p-[3px] hover:border-primary"
                    >
                      <Check
                        class="scale-0 text-primary transition-all duration-150 group-hover:scale-100"
                        strokeWidth={4}
                      />
                    </Button>
                  </form>
                  {task.name}
                </Card.Content>
              </Card.Root>
            {/each}
          </Card.Content>
        </ScrollArea>
        <Card.Footer class="px-4 py-2">
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
