<script>
  import TaskCard from '$components/taskCard.svelte';
  import { ScrollArea } from '$shadcn/scroll-area/index.js';
  import { Button } from '$shadcn/button/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import SectionDropdown from '$components/sectionDropdown.svelte';
  import { Textarea } from '$shadcn/textarea/index.js';
  import { EllipsisVertical } from 'lucide-svelte';
  import * as Card from '$shadcn/card/index.js';
  import * as DropdownMenu from '$shadcn/dropdown-menu/index.js';
  import * as Popover from '$shadcn/popover/index.js';
  import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
  import { enhance } from '$app/forms';
  import TaskPlaceholder from '$components/taskPlaceholder.svelte';
  import { expoInOut } from 'svelte/easing';
  import { flip } from 'svelte/animate';

  export let id;
  export let name;
  export let tasks;
  export let isTaskPopoversOpen;
  export let onDrop;

  function handleConsider(event) {
    tasks = event.detail.items;
  }

  function handleFinalize(event) {
    onDrop(event.detail.items);
  }
</script>

<Card.Root
  class="max-h-full w-full min-w-64 border-none bg-background shadow-none ring-border ring-offset-background transition-shadow duration-150 ease-in-out hover:ring-1 hover:ring-offset-2 sm:w-72"
>
  <Card.Header class="group px-3 py-3 pt-2 ">
    <Card.Title tag="h2" class="text-md flex items-center">
      <div class="flex flex-1 items-center gap-2">
        {name}
        <div class="flex-1 align-bottom text-sm text-muted-foreground/70">
          {tasks.filter((t) => !t.isCompleted).length}
        </div>
      </div>
      <SectionDropdown {id} {name}>
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
    <Card.Content class="flex flex-col px-3 ">
      <div
        class="flex flex-col pt-4"
        use:dndzone={{ items: tasks, dropTargetStyle: '' }}
        on:finalize={handleFinalize}
        on:consider={handleConsider}
      >
        {#each tasks.filter((t) => !t.isCompleted) as task (task.id)}
          <div class="relative mb-2" animate:flip={{ duration: 150, easing: expoInOut }}>
            <TaskCard {task} sectionId={id} />
            {#if task[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
              <TaskPlaceholder taskName={task.name} />
            {/if}
          </div>
        {/each}
      </div>
      {#each tasks.filter((t) => t.isCompleted) as task (task.id)}
        <div class="mb-2">
          <TaskCard {task} sectionId={id} />
        </div>
      {/each}
    </Card.Content>
  </ScrollArea>
  <Card.Footer class="px-4 py-2 pt-0">
    <Popover.Root bind:open={isTaskPopoversOpen[id]}>
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
          on:submit={() => (isTaskPopoversOpen[id] = false)}
        >
          <Label for="sectionName" class="font-bold">Име на задачата</Label>
          <input type="text" hidden name="sectionId" value={id} />
          <Textarea class="resize-none" name="taskName" />
          <Button type="submit">Добави</Button>
        </form>
      </Popover.Content>
    </Popover.Root>
  </Card.Footer>
</Card.Root>
