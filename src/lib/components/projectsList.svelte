<script>
  import { slide } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import { ChevronDown } from 'lucide-svelte';
  import ProjectButton from '$lib/components/projectButton.svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Collapsible from '$shadcn/collapsible/index.js';
  import * as Tooltip from '$shadcn/tooltip/index.js';

  export let isProjectsOpen = false;
  export let projects;
  export let title;
</script>

<Collapsible.Root class="flex w-full flex-col gap-1" bind:open={$isProjectsOpen}>
  <div>
    <Button variant="outline" class="flex w-full items-center justify-between bg-card pr-2">
      <h2 class="text-sm font-semibold text-foreground">{title}</h2>
      <Collapsible.Trigger asChild let:builder>
        <Button
          builders={[builder]}
          variant="ghost"
          class="flex h-6 w-6 justify-center p-0 text-primary hover:text-muted-foreground"
        >
          <Tooltip.Root openDelay="200">
            <Tooltip.Trigger>
              <ChevronDown
                tabindex="-1"
                strokeWidth={3}
                class="{$isProjectsOpen ? '-rotate-180' : ''}
               h-4 w-4 transition-transform duration-300 ease-in-out focus:outline-none"
              />
              <span class="sr-only">Toggle</span>
            </Tooltip.Trigger>
            <Tooltip.Content>
              {#if $isProjectsOpen}
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
      class="mt-2 space-y-2"
      transition={slide}
      transitionConfig={{ duration: 300, easing: cubicInOut }}
    >
      <ScrollArea class="flex max-h-48 flex-col rounded-md">
        <div class="flex flex-col gap-0.5">
          {#each projects as project (project.id)}
            <ProjectButton id={project.id} title={project.title} isFavorite={project.isFavorite} />
          {/each}
        </div>
      </ScrollArea>
    </Collapsible.Content>
    <slot />
  </div>
</Collapsible.Root>
