<script>
  import { EllipsisVertical, ListTodo } from 'lucide-svelte';
  import { Button } from '$shadcn/button/index.js';
  import * as DropdownMenu from '$shadcn/dropdown-menu/index.js';
  import ProjectDropdown from '$components/projectDropdown.svelte';

  export let id;
  export let title;
  export let isFavorite;
  export let handleClick;
</script>

<Button
  href="/app/{id}"
  on:click={handleClick}
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
  <ProjectDropdown {id} {title} {isFavorite}>
    <div class="flex" on:click={(e) => e.stopPropagation()} role="presentation">
      <DropdownMenu.Trigger class="invisible mr-3 text-muted-foreground group-hover:visible">
        <EllipsisVertical size={18} />
      </DropdownMenu.Trigger>
    </div>
  </ProjectDropdown>
</Button>
