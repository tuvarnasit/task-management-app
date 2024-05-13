<script>
  import { toast } from 'svelte-sonner';
  import { Heart, HeartOff, Pencil, Trash2 } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Switch } from '$lib/components/ui/switch/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { enhance } from '$app/forms';
  import * as DropdownMenu from '$shadcn/dropdown-menu/index.js';
  import * as AlertDialog from '$shadcn/alert-dialog/index.js';
  import * as Dialog from '$shadcn/dialog/index.js';

  export let id;
  export let title;
  export let isFavorite;

  $: isFavoritesChecked = isFavorite;
  let isAlertOpen = false;
  let isDialogOpen = false;
  let toggleFavoriteForm;
</script>

<AlertDialog.Root bind:open={isAlertOpen}>
  <Dialog.Root bind:open={isDialogOpen}>
    <DropdownMenu.Root>
      <slot />
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <form
              action="/app/{id}?/updateProject"
              bind:this={toggleFavoriteForm}
              method="POST"
              use:enhance={() => {
                return async ({ update }) => {
                  await update();
                };
              }}
            >
              <button class="flex w-full items-center justify-start gap-2" type="submit">
                <input type="text" hidden name="title" value={title} />
                <input name="addToFavorites" hidden value={isFavorite ? 'no' : 'yes'} />
                <div class="text-muted-foreground">
                  {#if !isFavorite}
                    <Heart strokeWidth={2} size={18} />
                  {:else}
                    <HeartOff strokeWidth={2} size={18} />
                  {/if}
                </div>
                <div>
                  {#if !isFavorite}
                    Добави към фаворити
                  {:else}
                    Премахни от фаворити
                  {/if}
                </div>
              </button>
            </form>
          </DropdownMenu.Item>
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
        action="/app/{id}?/updateProject"
        class="flex flex-col gap-4"
        use:enhance={() => {
          return async ({ update }) => {
            await update();
          };
        }}
      >
        <div class="mt-4 flex flex-col gap-4">
          <Label for="title" class="font-bold">Име на проекта</Label>
          <Input id="title" value={title} name="title" required />
        </div>
        <input name="addToFavorites" hidden value={isFavoritesChecked ? 'yes' : 'no'} />
        <div class="flex items-center gap-2">
          <Switch bind:checked={isFavoritesChecked} id="addToFavorites" />
          <Label for="addToFavorites">Добави към фаворити</Label>
        </div>
        <Dialog.Footer>
          <Button type="submit" class="font-bold">Запази промените</Button>
        </Dialog.Footer>
      </form>
    </Dialog.Content>
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
            toast.info(`"${title}" беше успешно изтрит`);
          }}
          use:enhance
        >
          <Button variant="destructive" class="font-bold" type="submit">Да, изтрий го</Button>
        </form>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </Dialog.Root>
</AlertDialog.Root>
