<script>
  import { Label } from '$shadcn/label/index.js';
  import { Input } from '$shadcn/input/index.js';
  import { Button } from '$shadcn/button/index.js';
  import { emailRegEx } from '$lib/utils.js';
  import { enhance } from '$app/forms';
  import { loginDataStore } from '$stores/loginDataStore.js';
  import { page } from '$app/stores.js';

  export let formData = $loginDataStore;
  let isValid = false;
  $: {
    loginDataStore.update(() => ({ ...formData }));
  }
  $: isEmailValid = emailRegEx.test(formData.email.toLowerCase().trim());
  $: isPasswordValid = formData.password.trim().length > 0;

  $: {
    if (isEmailValid && isPasswordValid) {
      isValid = true;
    } else {
      isValid = false;
    }
  }
</script>

<form class="mx-auto grid gap-8 py-4 sm:w-[352px]" method="POST" use:enhance>
  <div class="grid gap-2 text-center">
    <h1 class="text-3xl font-bold text-foreground">Вход</h1>
    <p class="text-balance text-muted-foreground">
      Въведи имейл и парола, за да влезеш в акаунта си
    </p>
  </div>
  <div class="grid gap-4">
    <div class="grid gap-2">
      <Label for="email" class="text-foreground">Имейл адрес</Label>
      <Input
        bind:value={formData.email}
        id="email"
        name="email"
        type="email"
        placeholder="ivan.ivanov@example.com"
        required
      />
    </div>
    <div class="grid gap-2">
      <Label for="password" class="text-foreground">Парола</Label>
      <Input
        bind:value={formData.password}
        name="password"
        id="password"
        type="password"
        required
      />
      {#if $page.form?.error}
        <p class="text-center text-sm text-destructive sm:text-left">{$page.form.error}</p>
      {/if}
    </div>
    <Button type="submit" class="mt-2 w-full" disabled={!isValid}>Вход</Button>
    <Button variant="secondary" class="w-full">
      <div class="flex gap-4">
        <i class="fab fa-google text- text- m-auto text-primary"></i>
        <div>Вход чрез Google</div>
      </div>
    </Button>
    <div class="text-center text-sm text-foreground">
      Нямаш акаунт?
      <Button
        href="/auth/register"
        variant="link"
        class="text-primary-background pl-1 underline transition-colors duration-300 ease-in-out hover:text-muted-foreground"
      >
        Регистрирай се
      </Button>
    </div>
  </div>
</form>
