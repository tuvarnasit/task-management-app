<script>
  import * as Card from '$shadcn/card/index.js';
  import * as Popover from '$shadcn/popover/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { ListTodo, SquarePlus } from 'lucide-svelte';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { page } from '$app/stores.js';
  import { enhance } from '$app/forms';

  export let data;
  let isPopoverOpen = false;
</script>

<svelte:head>
  <title>{data.project.title} | todo.bg</title>
</svelte:head>

<div class="flex flex-col gap-4 px-8 py-2">
  <h1 class="flex items-center gap-2 text-xl font-bold">
    <span class="text-primary">
      <ListTodo size={30} />
    </span>
    {data.project.title}
  </h1>
  <div class="flex items-start gap-8">
    {#each data.project.sections as { id, name, tasks }}
      <Card.Root
        class="w-64 min-w-56 border-none bg-background shadow-none ring-border transition-all duration-150 ease-in-out hover:ring-1 hover:ring-offset-2"
      >
        <Card.Header class="px-4 py-4 pt-2">
          <Card.Title tag="h2" class="text-md ">{name}</Card.Title>
        </Card.Header>
        <Card.Content class="flex flex-col gap-2 px-4">
          {#each tasks as task}
            <Card.Root tag="h3" class="bg-background py-1 text-sm">
              <Card.Content class="px-4">
                {task.name}
              </Card.Content>
            </Card.Root>
          {/each}
        </Card.Content>
        <Card.Footer class="px-4 py-2">
          <Button variant="default" size="sm" class="flex justify-start shadow-sm"
            >Добави задача</Button
          >
        </Card.Footer>
      </Card.Root>
    {/each}

    <Popover.Root bind:open={isPopoverOpen} portal="null">
      <Popover.Trigger>
        <Button variant="muted" class="flex w-64 min-w-56 justify-start gap-2">
          <SquarePlus strokeWidth={1} />
          <div>Добави секция</div>
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <form
          on:submit={() => (isPopoverOpen = false)}
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
