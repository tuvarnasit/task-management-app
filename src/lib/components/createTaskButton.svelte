<script>
  import { Button } from '$shadcn/button/index.js';
  import { Plus } from 'lucide-svelte';
  import * as Dialog from '$shadcn/dialog/index.js';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import Check from 'lucide-svelte/icons/check';
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
  import * as Command from '$lib/components/ui/command/index.js';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { cn } from '$lib/utils.js';
  import { enhance } from '$app/forms';

  export let projects;
  let comboboxOpen = false;
  let dialogOpen = false;
  let value = projects[0]?.id ?? '';
  $: selectedValue = projects.find((p) => p.id === value)?.title ?? 'Избери проект...';
</script>

<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Trigger>
    <Button variant="default" class="flex w-full items-center justify-start gap-2 font-bold ">
      <div class="rounded-full bg-primary-foreground text-primary">
        <Plus strokeWidth={2} />
      </div>
      <div>Нова задача</div>
    </Button>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[380px]">
    <Dialog.Header>
      <Dialog.Title>Добави нова задача</Dialog.Title>
    </Dialog.Header>
    <form
      action="/app/{value}?/appendTaskToProject"
      use:enhance
      method="POST"
      on:submit={() => (dialogOpen = false)}
    >
      <input type="text" hidden name="projectId" {value} required />
      <div class="grid gap-4 py-4">
        <div class="flex flex-col gap-3">
          <Label for="taskName" class="font-bold">Име на задачата</Label>
          <Textarea class="resize-none" id="taskName" name="taskName" required />
        </div>
        <div class="flex flex-col gap-3">
          <Label for="project" class="font-bold">Избери проект</Label>
          <Popover.Root bind:open={comboboxOpen}>
            <Popover.Trigger asChild let:builder>
              <Button
                builders={[builder]}
                variant="outline"
                role="combobox"
                aria-expanded={open}
                class="w-full justify-between"
              >
                {selectedValue}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </Popover.Trigger>
            <Popover.Content class=" w-[88%] p-0">
              <Command.Root>
                <Command.Input placeholder="Търси проекти..." />
                <Command.Empty>Няма резултати.</Command.Empty>
                <Command.Group>
                  {#each projects as project}
                    <Command.Item
                      value={project.id}
                      onSelect={(currentValue) => {
                        value = currentValue;
                        // closeAndFocusTrigger(ids.trigger);
                      }}
                    >
                      <Check
                        class={cn('mr-2 h-4 w-4', value !== project.id && 'text-transparent')}
                      />
                      {project.title}
                    </Command.Item>
                  {/each}
                </Command.Group>
              </Command.Root>
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
      <Dialog.Footer>
        <Button type="submit">Добави</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
