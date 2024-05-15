<script>
  import { fly } from 'svelte/transition';
  import { Button } from '$shadcn/button/index.js';
  import { Plus, PanelLeftClose, PanelLeftOpen } from 'lucide-svelte';
  import { browser } from '$app/environment';
  import CreateProjectButton from '$components/createProjectButton.svelte';
  import DarkModeToggle from '$components/darkModeToggle.svelte';
  import ProjectsList from '$components/projectsList.svelte';
  import AccountButton from '$components/accountButton.svelte';
  import {
    favoritesExpanded,
    projectsExpanded,
    sharedExpanded
  } from '$stores/projectsExpandedStore.js';

  export let data;
  let showNav = true;

  if (browser) {
    let lastX = window.innerWidth;

    const toggleNavOnResize = () => {
      let x = window.innerWidth;

      if (lastX <= 681 && 681 < x) {
        showNav = true;
      }
      if (lastX >= 680 && 680 > x) {
        showNav = false;
      }
      lastX = x;
    };

    window.addEventListener('resize', toggleNavOnResize);
  }
</script>

<main class="flex h-lvh w-full bg-background">
  <nav
    class="{showNav ? 'w-60 min-w-60' : 'w-0 min-w-0 border-none'}
    absolute z-50 h-svh overflow-hidden border-r border-r-border bg-card transition-all duration-200 ease-out sm:static"
  >
    <div class="flex flex-col gap-4 p-2">
      <div class="flex flex-col gap-4">
        <div class="flex justify-start gap-2">
          <AccountButton user={data.user}></AccountButton>
          {#if showNav}
            <div out:fly={{ duration: 300 }}>
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
        </div>
        <Button variant="default" class="flex w-full items-center justify-start gap-2 font-bold ">
          <div class="rounded-full bg-primary-foreground text-primary">
            <Plus strokeWidth={2} />
          </div>
          <div>Нова задача</div>
        </Button>
      </div>
      {#if data.favoriteProjects.length > 0}
        <ProjectsList
          title="Фаворити"
          projects={data.favoriteProjects}
          isProjectsOpen={favoritesExpanded}
        />
      {/if}
      <ProjectsList
        title="Моите проекти"
        projects={data.projects}
        isProjectsOpen={projectsExpanded}
      >
        <CreateProjectButton />
      </ProjectsList>
      {#if data.sharedProjects.length > 0}
        <ProjectsList
          title="Споделени с мен"
          projects={data.sharedProjects}
          isProjectsOpen={sharedExpanded}
        />
      {/if}
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
