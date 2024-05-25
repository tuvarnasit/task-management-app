<script>
  import { toast } from 'svelte-sonner';
  import { Pencil, Trash2 } from 'lucide-svelte';
  import { Button } from '$shadcn/button/index.js';
  import { Label } from '$shadcn/label/index.js';
  import { Input } from '$shadcn/input/index.js';
  import { enhance } from '$app/forms';
  import * as DropdownMenu from '$shadcn/dropdown-menu/index.js';
  import * as AlertDialog from '$shadcn/alert-dialog/index.js';
  import * as Dialog from '$shadcn/dialog/index.js';

  export let name;
  export let id;

  let isAlertOpen = false;
  let isDialogOpen = false;
</script>

<AlertDialog.Root bind:open={isAlertOpen}>
  <Dialog.Root bind:open={isDialogOpen}>
    <DropdownMenu.Root>
      <slot />
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <Dialog.Trigger class="w-full">
            <DropdownMenu.Item class="flex w-full items-center justify-start gap-2">
              <div class="text-muted-foreground">
                <Pencil strokeWidth={2} size={18} />
              </div>
              <div>Редактирай</div>
            </DropdownMenu.Item>
          </Dialog.Trigger>
          <AlertDialog.Trigger class="w-full">
            <DropdownMenu.Item class="flex w-full items-center justify-start gap-2">
              <div class="text-destructive">
                <Trash2 strokeWidth={2} size={18} />
              </div>
              <div>Изтрий</div>
            </DropdownMenu.Item>
          </AlertDialog.Trigger>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Редактиране</Dialog.Title>
      </Dialog.Header>
      <form
        method="POST"
        on:submit={() => (isDialogOpen = false)}
        action="?/updateSection"
        class="flex flex-col gap-4"
        use:enhance={() => {
          return async ({ update }) => {
            await update();
          };
        }}
      >
        <input hidden name="sectionId" value={id} />
        <div class="mt-4 flex flex-col gap-4">
          <Label for="name" class="font-bold">Име на секцията</Label>
          <Input id="name" value={name} name="sectionName" required />
        </div>
        <Dialog.Footer>
          <Button type="submit" class="font-bold">Запази промените</Button>
        </Dialog.Footer>
      </form>
    </Dialog.Content>
    <AlertDialog.Content>
      <AlertDialog.Header class="mb-4 grid gap-2">
        <AlertDialog.Title>Наистина ли искаш да изтриеш тази секция?</AlertDialog.Title>
        <AlertDialog.Description>
          Това действие не може да бъде върнато. Секцията "{name}" и всички задачи в нея ще бъдат
          изтрити завинаги.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel class="font-bold">Отказ</AlertDialog.Cancel>
        <form
          method="POST"
          action="?/deleteSection"
          on:submit={() => {
            isAlertOpen = false;
            toast.info(`Секция "${name}" беше успешно изтрита`);
          }}
          use:enhance
        >
          <input type="text" hidden name="sectionId" value={id} />
          <Button variant="destructive" class="font-bold" type="submit">Да, изтрий я</Button>
        </form>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </Dialog.Root>
</AlertDialog.Root>
