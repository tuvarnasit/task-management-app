<script>
  import { fly, slide } from 'svelte/transition';
  import { Button } from '$shadcn/button/index.js';
  import { PanelLeftClose, PanelLeftOpen } from 'lucide-svelte';
  import { browser } from '$app/environment';
  import CreateProjectButton from '$components/createProjectButton.svelte';
  import DarkModeToggle from '$components/darkModeToggle.svelte';
  import ProjectsList from '$components/projectsList.svelte';
  import AccountButton from '$components/accountButton.svelte';
  import CreateTaskButton from '$lib/components/createTaskButton.svelte';
  import {
    favoritesExpanded,
    projectsExpanded,
    sharedExpanded
  } from '$stores/projectsExpandedStore.js';
  import { expoInOut } from 'svelte/easing';

  export let data;
  const SM_WIDTH_THRESHOLD = 680;
  let showNav = browser && window.innerWidth >= SM_WIDTH_THRESHOLD ? true : false;

  if (browser) {
    let lastX = window.innerWidth;

    const toggleNavOnResize = () => {
      let x = window.innerWidth;

      if (lastX <= SM_WIDTH_THRESHOLD + 1 && SM_WIDTH_THRESHOLD + 1 < x) {
        showNav = true;
      }
      if (lastX >= SM_WIDTH_THRESHOLD && SM_WIDTH_THRESHOLD > x) {
        showNav = false;
      }
      lastX = x;
    };

    window.addEventListener('resize', toggleNavOnResize);
  }
  let navOpenButton;

  function handleNavCloseOnSmallScreens() {
    if (browser && window.innerWidth <= SM_WIDTH_THRESHOLD) {
      showNav = false;
    }
  }
</script>

<main class="flex h-svh w-full bg-background">
  <nav
    class="{showNav ? 'w-60 min-w-60' : 'w-0 min-w-0 border-none'}
    absolute z-50 h-svh overflow-hidden border-r border-r-border bg-card transition-all duration-200 ease-out sm:static"
  >
    <div class="flex flex-col gap-4 p-2">
      <div class="flex flex-col gap-4">
        <div class="flex justify-start gap-2">
          <AccountButton user={data.user} />
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
        <CreateTaskButton projects={data.projects} />
      </div>
      {#if data.favoriteProjects.length > 0}
        <div transition:slide={{ easing: expoInOut, duration: 300 }}>
          <ProjectsList
            title="Фаворити"
            projects={data.favoriteProjects}
            isProjectsOpen={favoritesExpanded}
            handleClick={handleNavCloseOnSmallScreens}
          />
        </div>
      {/if}
      <ProjectsList
        title="Моите проекти"
        projects={data.projects}
        isProjectsOpen={projectsExpanded}
        handleClick={handleNavCloseOnSmallScreens}
      >
        <CreateProjectButton />
      </ProjectsList>
      {#if data.sharedProjects.length > 0}
        <ProjectsList
          title="Споделени с мен"
          projects={data.sharedProjects}
          isProjectsOpen={sharedExpanded}
          handleClick={handleNavCloseOnSmallScreens}
        />
      {/if}
    </div>
  </nav>
  <section
    role="presentation"
    class="flex w-full flex-col overflow-x-hidden px-6 py-2"
    on:click={(event) => {
      if (!navOpenButton) return;
      if (!navOpenButton.contains(event.target) && showNav && browser && window.innerWidth <= 680) {
        showNav = false;
      }
    }}
  >
    <div class="flex h-10">
      {#if !showNav}
        <div transition:fly={{ duration: 110 }} bind:this={navOpenButton}>
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
