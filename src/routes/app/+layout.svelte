<script>
  import { enhance } from '$app/forms';
  import { slide } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { Button, buttonVariants } from '$shadcn/button/index.js';
  import { ScrollArea } from '$shadcn/scroll-area/index.js';
  import * as Tooltip from '$shadcn/tooltip/index.js';
  import * as Dialog from '$shadcn/dialog/index.js';
  import * as Collapsible from '$shadcn/collapsible/index.js';
  import { Plus, ChevronDown, PanelLeftClose, PanelLeftOpen, ListTodo } from 'lucide-svelte';
  import { cn } from '$lib/utils.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Input } from '$lib/components/ui/input/index.js';

  export let data;
  let showNav = true;
  let isProjectsOpen = true;
  let dialogOpen = false;
</script>

<main
  class="flex h-svh w-full
  {showNav ? 'divide-x-[1px] divide-border' : ''}
  bg-background"
>
  <nav
    class="{showNav ? 'w-52 min-w-52' : 'w-0 min-w-0'}
     absolute h-svh overflow-hidden bg-card transition-all duration-200 ease-out sm:static"
  >
    <div class="flex flex-col gap-4 p-2">
      <div class="flex flex-col gap-1">
        {#if showNav}
          <div out:fly={{ duration: 300 }} class="flex justify-end">
            <Button on:click={() => (showNav = !showNav)} class="px-0" variant="ghost" size="icon">
              <PanelLeftClose strokeWidth={1} size={30} />
            </Button>
          </div>
        {/if}
        <Button variant="default" class="w-full">
          <div class="flex w-full items-center justify-start gap-2 font-bold">
            <div class="text-muted">
              <Plus strokeWidth={2} />
            </div>
            <div>Нова задача</div>
          </div>
        </Button>
      </div>
      <Collapsible.Root class="flex w-full flex-col gap-1" bind:open={isProjectsOpen}>
        <div>
          <Button variant="ghost" class="mb-2 flex w-full items-center justify-between gap-2">
            <h2 class="text-sm font-semibold text-foreground">Моите проекти</h2>
            <Collapsible.Trigger asChild let:builder>
              <Button
                builders={[builder]}
                variant="ghost"
                class="h-6 w-6 p-0 text-primary hover:text-muted-foreground"
              >
                <Tooltip.Root openDelay="200">
                  <Tooltip.Trigger>
                    <ChevronDown
                      tabindex="-1"
                      class="{isProjectsOpen ? '-rotate-180' : ''}
               h-4 w-4 transition-transform duration-300 ease-in-out"
                    />
                    <span class="sr-only">Toggle</span>
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    {#if isProjectsOpen}
                      Скрий списъка с проектите
                    {:else}
                      Покажи списъка с проектите
                    {/if}
                  </Tooltip.Content>
                </Tooltip.Root>
              </Button>
            </Collapsible.Trigger>
          </Button>
          <Collapsible.Content
            class="space-y-2"
            transition={slide}
            transitionConfig={{ duration: 300, easing: cubicInOut }}
          >
            <ScrollArea class="flex max-h-48 w-full flex-col rounded-md">
              <div class="flex flex-col gap-0.5 pr-3">
                {#each data.projects as project}
                  <Button
                    href="/app/{project.id}"
                    variant="ghost"
                    size="sm"
                    class="flex w-full justify-start gap-2 overflow-ellipsis px-6"
                  >
                    <div class="text-primary">
                      <ListTodo strokeWidth={2} size={18} />
                    </div>
                    <div>
                      {project.title}
                    </div>
                  </Button>
                {/each}
              </div>
            </ScrollArea>
          </Collapsible.Content>
          <Dialog.Root bind:open={dialogOpen}>
            <Dialog.Trigger
              class={cn(
                buttonVariants({
                  variant: 'muted',
                  size: 'sm'
                }),
                'flex w-full justify-start gap-2 px-4 font-bold'
              )}
            >
              <Plus strokeWidth={2} />
              <div>Нов проект</div>
            </Dialog.Trigger>
            <Dialog.Content class="sm:max-w-[450px]">
              <Dialog.Header>
                <Dialog.Title>Създай нов проект</Dialog.Title>
              </Dialog.Header>
              <form
                on:submit={() => (dialogOpen = false)}
                action="/app/projects?/createProject"
                method="POST"
                use:enhance
              >
                <div class="grid gap-4 py-4">
                  <div class="flex flex-col gap-3">
                    <Label for="projectTitle" class="font-bold">Име на проекта</Label>
                    <Input id="projectTitle" name="projectTitle" type="text" required />
                  </div>
                </div>
                <Dialog.Footer class="mt-2">
                  <Button type="submit" class="font-bold">Създай</Button>
                </Dialog.Footer>
              </form>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      </Collapsible.Root>
    </div>
  </nav>
  <section class="w-full overflow-x-scroll p-2">
    <div class="mb-4 h-10">
      {#if !showNav}
        <div transition:fly={{ duration: 110 }}>
          <Button on:click={() => (showNav = !showNav)} variant="ghost" size="icon" class="">
            <PanelLeftOpen strokeWidth={1} size={30} />
          </Button>
        </div>
      {/if}
    </div>
    <slot></slot>
  </section>
</main>
