<script>
  import { EllipsisVertical, ListTodo, Trash2, Pencil } from 'lucide-svelte';
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as DropdownMenu from '$shadcn/dropdown-menu/index.js';
  import * as AlertDialog from '$shadcn/alert-dialog/index.js';
  import { cn } from '$lib/utils.js';
  import { toast } from 'svelte-sonner';
  import { enhance } from '$app/forms';

  export let id;
  export let title;
  let isAlertOpen = false;
</script>

<Button
  href="/app/{id}"
  variant="ghost"
  size="sm"
  class="group flex w-60 items-center justify-between gap-2 px-6"
>
  <div class="text-primary">
    <ListTodo strokeWidth={2} size={18} />
  </div>
  <div class="flex-grow overflow-hidden overflow-ellipsis">
    {title}
  </div>
  <AlertDialog.Root bind:open={isAlertOpen}>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger class=" invisible text-muted-foreground group-hover:visible">
        <EllipsisVertical size={18} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Item class="flex w-full items-center justify-start gap-2 ">
            <div class="text-muted-foreground">
              <Pencil strokeWidth={2} size={18} />
            </div>
            <div>Редактирай</div>
          </DropdownMenu.Item>
          <AlertDialog.Trigger class="w-full">
            <DropdownMenu.Item class="flex w-full items-center justify-start gap-2 ">
              <div class="text-destructive">
                <Trash2 strokeWidth={2} size={18} />
              </div>
              <div>Изтрий</div>
            </DropdownMenu.Item>
          </AlertDialog.Trigger>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
    <AlertDialog.Content>
      <AlertDialog.Header class="mb-4 grid gap-2">
        <AlertDialog.Title>Наистина ли искаш да изтриеш този проект?</AlertDialog.Title>
        <AlertDialog.Description>
          Това действие не може да бъде върнато. Проектът "{title}" и всички задачи в него ще бъдат
          изтрити завинаги.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel class="font-bold">Отказ</AlertDialog.Cancel>
        <form
          method="POST"
          action="/app/{id}?/deleteProject"
          on:submit={() => {
            isAlertOpen = false;
            toast.info(`${title} е успешно изтрит`);
          }}
          use:enhance
        >
          <Button variant="destructive" class="font-bold" type="submit">Да, изтрий го</Button>
        </form>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
</Button>
