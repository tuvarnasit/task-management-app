<script>
  import { cn } from '$lib/utils.js';
  import { Plus } from 'lucide-svelte';
  import { Label } from '$shadcn/label/index.js';
  import { Input } from '$shadcn/input/index.js';
  import * as Dialog from '$shadcn/dialog/index.js';
  import { Button, buttonVariants } from '$shadcn/button/index.js';
  import { enhance } from '$app/forms';

  let dialogOpen = false;
</script>

<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Trigger
    class={cn(
      buttonVariants({
        variant: 'muted',
        size: 'sm'
      }),
      'mt-4 flex w-full justify-start gap-2 px-4 font-bold'
    )}
  >
    <div>
      <Plus strokeWidth={2} />
    </div>
    <div>Нов проект</div>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[450px]">
    <Dialog.Header>
      <Dialog.Title>Създай нов проект</Dialog.Title>
    </Dialog.Header>
    <form
      on:submit={() => (dialogOpen = false)}
      action="/app/projects?/createProject"
      method="POST"
      use:enhance
    >
      <div class="grid gap-4 py-4">
        <div class="flex flex-col gap-3">
          <Label for="projectTitle" class="font-bold">Име на проекта</Label>
          <Input id="projectTitle" name="projectTitle" type="text" required />
        </div>
      </div>
      <Dialog.Footer class="mt-2">
        <Button type="submit" class="font-bold">Създай</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
