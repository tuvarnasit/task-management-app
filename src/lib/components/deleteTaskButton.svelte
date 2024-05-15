<script>
  import * as AlertDialog from '$shadcn/alert-dialog/index.js';
  import { toast } from 'svelte-sonner';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Trash2 } from 'lucide-svelte';
  import { enhance } from '$app/forms.js';

  export let sectionId;
  export let name;
  export let taskId;
  let isAlertOpen = false;
</script>

<AlertDialog.Root bind:open={isAlertOpen}>
  <AlertDialog.Trigger>
    <Button variant="ghost" size="icon" class="size-5 p-0">
      <Trash2 class=" text-destructive" size={18} />
    </Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header class="mb-4 grid gap-2">
      <AlertDialog.Title>Наистина ли искаш да изтриеш тази задача?</AlertDialog.Title>
      <AlertDialog.Description>
        Това действие не може да бъде върнато. Задачата ще бъде изтрита завиганги.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel class="font-bold">Отказ</AlertDialog.Cancel>
      <form
        action="?/deleteTask"
        method="POST"
        use:enhance
        on:submit={() => {
          isAlertOpen = false;
          toast.message(`Задача "${name}" беше успешно изтрита`);
        }}
      >
        <input type="text" hidden name="taskId" value={taskId} />
        <input type="text" hidden name="sectionId" value={sectionId} />
        <Button variant="destructive" class="font-bold" type="submit">Да, изтрий я</Button>
      </form>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
