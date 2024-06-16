<script>
  import { toast } from 'svelte-sonner';
  import { Button } from '$shadcn/button/index.js';
  import { Check } from 'lucide-svelte';
  import * as Card from '$shadcn/card/index.js';
  import DeleteTaskButton from '$components/deleteTaskButton.svelte';
  import { enhance } from '$app/forms';

  export let sectionId;
  export let isCompleted;
  export let task;
</script>

<Card.Root tag="h3" class="group/card bg-background py-3 text-sm">
  <Card.Content class="flex gap-2 px-3 {isCompleted ? 'text-muted-foreground line-through' : ''}">
    <form
      action="?/{isCompleted ? 'undoCompleteTask' : 'completeTask'}"
      method="POST"
      use:enhance
      on:submit={() => {
        if (!isCompleted) {
          toast.success('1 Изпълнена задача');
        }
      }}
    >
      <input type="text" hidden name="taskId" value={task.id} />
      <input type="text" hidden name="sectionId" value={sectionId} />
      {#if !isCompleted}
        <Button
          variant="ghost"
          class="group flex size-5 items-center justify-center rounded-full border border-border p-[3px] hover:border-primary"
          type="submit"
        >
          <Check
            class="scale-0 text-primary transition-all duration-150 group-hover:scale-100"
            strokeWidth={4}
          />
        </Button>
      {:else}
        <Button
          variant="ghost"
          class="flex size-5 items-center justify-center rounded-full border border-border bg-muted p-[3px]"
          type="submit"
        >
          <Check class="text-muted-foreground/80 transition-all duration-150" strokeWidth={4} />
        </Button>
      {/if}
    </form>
    <div class="flex-1">
      {task.name}
    </div>
    <div class="opacity-0 transition duration-150 ease-in-out group-hover/card:opacity-100">
      <DeleteTaskButton taskId={task.id} {sectionId} name={task.name} />
    </div>
  </Card.Content>
</Card.Root>
