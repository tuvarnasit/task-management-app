<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
</script>

<main class="w-full lg:grid lg:grid-cols-2 bg-background h-svh">
  <section class="flex items-center justify-center py-12 px-4 h-full">
    <div class="mx-auto grid w-[350px] gap-8">
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold text-foreground">Вход</h1>
        <p class="text-balance text-muted-foreground">
          Въведи имейл и парола, за да влезеш в акаунта си
        </p>
      </div>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email" class="text-foreground">Имейл адрес</Label>
          <Input id="email" type="email" placeholder="ivan.ivanov@example.com" required />
        </div>
        <div class="grid gap-2">
          <Label for="password" class="text-foreground">Парола</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" class="w-full">Вход</Button>
        <Button variant="secondary" class="w-full">Вход чрез Google</Button>
      </div>
      <div class="mt-4 text-center text-sm text-foreground">
        Нямаш акаунт?
        <a href="/register" class="underline hover:text-muted-foreground">Регистрирай се</a>
      </div>
    </div>
  </section>
  <section class="hidden bg-muted lg:block">
    <img
      src="/banners/login-banner.svg"
      alt="banner"
      width="1920"
      height="1080"
      class="h-full w-full object-contain mix-blend-multiply"
    />
  </section>
</main>
