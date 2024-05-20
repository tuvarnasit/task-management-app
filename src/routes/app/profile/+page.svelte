<script>
  import * as Avatar from '$shadcn/avatar/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Button } from '$lib/components/ui/button/index.js';

  export let data;
  let isEditing = false;
  let userData = { ...data.user };
  const resetUserData = () => {
    userData = { ...data.user };
  };
</script>

<div class="flex w-96 flex-1 flex-col items-center justify-center gap-8 self-center">
  <div class="flex flex-col items-center justify-center gap-4">
    <Avatar.Root class="size-20">
      <Avatar.Image
        src="https://ui-avatars.com/api/?name={data.user.name}&background=random"
        alt="profile pic"
      />
      <Avatar.Fallback>{data.user.initials}</Avatar.Fallback>
    </Avatar.Root>
    <div class="text-center">
      <h1 class="text-xl">{data.user.name}</h1>
      <h2 class="text-muted-foreground">{data.user.email}</h2>
    </div>
  </div>
  <div class="flex w-full flex-col gap-2">
    <Label>Име</Label>
    <Input name="firstName" type="text" bind:value={userData.firstName} disabled={!isEditing} />
  </div>
  <div class="flex w-full flex-col gap-2">
    <Label>Фамилия</Label>
    <Input name="lastName" type="text" bind:value={userData.lastName} disabled={!isEditing} />
  </div>
  <div class="flex w-full flex-col gap-2">
    <Label>Имейл адрес</Label>
    <Input name="email" type="email" bind:value={userData.email} disabled={!isEditing} />
  </div>
  <div class="flex w-full flex-col gap-2">
    <Label>Парола</Label>
    <Input name="password" type="password" bind:value={userData.password} disabled={!isEditing} />
  </div>
  <div class="flex gap-4">
    {#if !isEditing}
      <Button on:click={() => (isEditing = true)}>Редактирай</Button>
    {:else}
      <Button
        variant="outline"
        on:click={() => {
          isEditing = false;
          resetUserData();
        }}>Отказ</Button
      >
    {/if}
    {#if isEditing}
      <Button>Запази</Button>
    {/if}
  </div>
</div>
