<script>
  import { Button } from '$shadcn/button/index.js';
  import { Plus, ChevronDown } from 'lucide-svelte';
  import * as Collapsible from '$shadcn/collapsible/index.js';
  import { slide } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import { ScrollArea } from '$shadcn/scroll-area/index.js';
  import * as Tooltip from '$shadcn/tooltip/index.js';

  export let data;
  let isProjectsOpen = true;
</script>

<main class="flex h-svh w-full divide-x-[1px] divide-border bg-background">
  <nav class="flex min-w-52 resize-x flex-col gap-8 bg-card px-2 py-8">
    <div class="flex flex-col gap-1">
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
              class="p-0 text-primary hover:text-muted-foreground"
            >
              <Tooltip.Root openDelay="200">
                <Tooltip.Trigger>
                  <ChevronDown
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
                  class="flex w-full justify-start overflow-ellipsis px-5"
                >
                  {project.title}
                </Button>
              {/each}
              <Button
                href="/app/"
                variant="ghost"
                size="sm"
                class="flex w-full justify-start overflow-ellipsis px-5"
              >
                Проект 1
              </Button>
              <Button
                href="/app/"
                variant="ghost"
                size="sm"
                class="flex w-full justify-start overflow-ellipsis px-5"
              >
                Проект 2
              </Button>
              <Button
                href="/app/"
                variant="ghost"
                size="sm"
                class="flex w-full justify-start overflow-ellipsis px-5"
              >
                Проект 3
              </Button>
              <Button
                href="/app/"
                variant="ghost"
                size="sm"
                class="flex w-full justify-start overflow-ellipsis px-5"
              >
                Проект 4
              </Button>
              <Button
                href="/app/"
                variant="ghost"
                size="sm"
                class="flex w-full justify-start overflow-ellipsis px-5"
              >
                Проект 5
              </Button>
              <Button
                href="/app/"
                variant="ghost"
                size="sm"
                class="flex w-full justify-start overflow-ellipsis px-5"
              >
                Проект 6
              </Button>
            </div>
          </ScrollArea>
        </Collapsible.Content>
        <Button
          href="/app/"
          variant="ghost"
          type="submit"
          size="sm"
          class="flex w-full justify-start gap-2 px-4"
        >
          <Plus strokeWidth={1} />
          <div>Нов проект</div>
        </Button>
      </div>
    </Collapsible.Root>
  </nav>
  <section class="w-full">
    <slot></slot>
  </section>
</main>
