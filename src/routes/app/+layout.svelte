<script>
  import { fly } from 'svelte/transition';
  import { Button } from '$shadcn/button/index.js';
  import CreateProjectButton from '$components/createProjectButton.svelte';
  import { Plus, PanelLeftClose, PanelLeftOpen } from 'lucide-svelte';
  import DarkModeToggle from '$lib/components/darkModeToggle.svelte';
  import { browser } from '$app/environment';
  import ProjectsList from '$lib/components/projectsList.svelte';

  export let data;
  let showNav = true;

  if (browser) {
    let lastX = window.innerWidth;

    function toggleNavOnResize() {
      let x = window.innerWidth;

      if (lastX <= 681 && 681 < x) {
        showNav = true;
      }
      if (lastX >= 680 && 680 > x) {
        showNav = false;
      }
      lastX = x;
    }

    window.addEventListener('resize', toggleNavOnResize);
  }
</script>

<main class="flex h-lvh w-full bg-background">
  <nav
    class="{showNav ? 'w-60 min-w-60' : 'w-0 min-w-0 border-none'}
    absolute h-svh overflow-hidden border-r border-r-border bg-card transition-all duration-200 ease-out sm:static"
  >
    <div class="flex flex-col gap-4 p-2">
      <div class="flex flex-col gap-4">
        {#if showNav}
          <div out:fly={{ duration: 300 }} class="flex justify-end">
            <Button
              on:click={() => (showNav = !showNav)}
              variant="outline"
              size="icon"
              class="bg-card"
            >
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
      {#if data.favoriteProjects.length > 0}
        <ProjectsList title="Фаворити" projects={data.favoriteProjects} />
      {/if}
      <ProjectsList title="Моите проекти" projects={data.projects}>
        <CreateProjectButton />
      </ProjectsList>
    </div>
  </nav>
  <section class="w-full overflow-x-scroll px-6 py-2">
    <div class="flex h-10">
      {#if !showNav}
        <div transition:fly={{ duration: 110 }}>
          <Button on:click={() => (showNav = !showNav)} variant="outline" size="icon" class="">
            <PanelLeftOpen strokeWidth={1} size={30} />
          </Button>
        </div>
      {/if}
      <DarkModeToggle />
    </div>
    <slot></slot>
  </section>
</main>
