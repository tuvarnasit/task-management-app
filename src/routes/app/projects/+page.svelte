<script>
  import { Input } from '$shadcn/input/index.js';
  import { Separator } from '$shadcn/separator/index.js';
  import { ListTodo } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import ProjectDropdown from '$lib/components/projectDropdown.svelte';
  export let data;
  let inputValue = '';
  $: foundProjects = data.projects.filter((p) =>
    p.title.toLowerCase().includes(inputValue.trim().toLowerCase())
  );
  $: foundSharedProjects = data.sharedProjects.filter((p) =>
    p.title.toLowerCase().includes(inputValue.trim().toLowerCase())
  );
</script>

<main class="mt-5 flex items-center justify-center">
  <section class="flex w-full max-w-[800px] flex-col gap-4">
    <h1 class="text-2xl font-bold">Моите проекти</h1>
    <Input placeholder="Търси проекти..." bind:value={inputValue} />
    <div class="flex flex-col gap-1">
      <h3 class="font-bold">
        {foundProjects.length}
        {foundProjects.length === 1 ? 'мой проект' : 'мои проекти'}
      </h3>
      <Separator />
    </div>
    {#each foundProjects as { id, title } (id)}
      <div>
        <Button
          href="/app/{id}"
          variant="ghost"
          size="lg"
          class="group flex w-60 w-full items-center justify-between gap-2 px-4"
        >
          <div class="text-primary">
            <ListTodo strokeWidth={2} size={22} />
          </div>
          <div class="flex-grow overflow-hidden overflow-ellipsis">
            {title}
          </div>
        </Button>
      </div>
    {/each}
    <div class="flex flex-col gap-1">
      <h3 class="font-bold">
        {foundSharedProjects.length}
        {foundSharedProjects.length === 1 ? 'споделен проект' : 'споделени проекти'}
      </h3>
      <Separator />
    </div>
    {#each foundSharedProjects as { id, title } (id)}
      <Button
        href="/app/{id}"
        variant="ghost"
        size="sm"
        class="group flex w-60 items-center justify-between gap-2 px-4"
      >
        <div class="text-primary">
          <ListTodo strokeWidth={2} size={18} />
        </div>
        <div class="flex-grow overflow-hidden overflow-ellipsis">
          {title}
        </div>
      </Button>
    {/each}
  </section>
</main>
