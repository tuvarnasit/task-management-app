<script>
  import { Label } from '$shadcn/label/index.js';
  import { Input } from '$shadcn/input/index.js';
  import { Button } from '$shadcn/button/index.js';
  import { emailRegEx } from '$lib/utils.js';
  import { registerDataStore } from '$lib/stores/registerDataStore.js';
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';

  export let formData = $registerDataStore;

  $: {
    registerDataStore.update(() => ({ ...formData }));
  }

  let isValid = false;

  $: isNameValid = formData.name.trim().length > 1 && formData.name.trim().split(' ').length === 1;
  $: isLastNameValid =
    formData.lastName.trim().length > 1 && formData.lastName.trim().split(' ').length === 1;
  $: isEmailValid = emailRegEx.test(formData.email.toLowerCase().trim());
  $: isPasswordValid = formData.password.trim().length > 5;

  $: {
    if (isNameValid && isLastNameValid && isEmailValid && isPasswordValid) {
      isValid = true;
    } else {
      isValid = false;
    }
  }
</script>

<form method="POST" class={'mx-auto grid w-[350px] gap-8 py-4'} use:enhance>
  <div class="grid gap-2 text-center">
    <h1 class="text-3xl font-bold text-foreground">Регистрация</h1>
    <p class="text-balance text-muted-foreground">Попълни всички полета, за да се регистрираш</p>
  </div>
  <div class="grid gap-4">
    <div class="grid gap-2">
      <Label for="firstName" class="text-foreground">Име</Label>
      <Input
        autocapitalize
        bind:value={formData.name}
        id="firstName"
        name="firstName"
        type="text"
        placeholder="Иван"
        required
      />
    </div>
    <div class="grid gap-2">
      <Label for="lastName" class="text-foreground">Фамилия</Label>
      <Input
        bind:value={formData.lastName}
        id="lastName"
        name="lastName"
        type="text"
        placeholder="Иванов"
        required
      />
    </div>
    <div class="grid gap-2">
      <Label for="regEmail" class="text-foreground">Имейл адрес</Label>
      <Input
        bind:value={formData.email}
        id="email"
        type="email"
        name="email"
        placeholder="ivan.ivanov@example.com"
        required
      />
    </div>
    <div class="grid gap-2">
      <Label for="password" class="text-foreground">Парола</Label>
      <Input
        bind:value={formData.password}
        id="password"
        name="password"
        type="password"
        required
      />
      {#if $page.form?.error}
        <p class="text-center text-sm text-destructive sm:text-left">{$page.form.error}</p>
      {/if}
    </div>
    <Button type="submit" class="mt-4 w-full" disabled={!isValid}>Регистрирай се</Button>
    <div class="text-center text-sm text-foreground">
      Вече имаш акаунт?
      <Button
        href="/auth/login"
        variant="link"
        class="text-primary-background pl-1 underline transition-colors duration-300 ease-in-out hover:text-muted-foreground"
      >
        Вход
      </Button>
    </div>
  </div>
</form>
