<script>
  import darkLogo from '$lib/assets/logos/logo-darkmode.svg';
  import lightLogo from '$lib/assets/logos/logo-lightmode.svg';
  import { mode } from 'mode-watcher';
  import { Button } from '$lib/components/ui/button/index.js';
  import DarkModeToggle from '$components/darkModeToggle.svelte';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import { Facebook, Instagram, Twitter } from 'lucide-svelte';
  import heroImg from '$assets/banners/hero-banner.svg';
</script>

<svelte:head>
  <title>Начало | todo.bg</title>
</svelte:head>

<header class="sticky top-0 z-50 w-full bg-background/60 backdrop-blur">
  <nav class="flex items-center justify-between p-4 sm:px-8">
    <img src={$mode == 'dark' ? darkLogo : lightLogo} alt="logo" class="w-36" />
    <div class="flex gap-2 font-bold">
      <Button href="/auth/login" variant="ghost" class="text-md h-full">Вход</Button>
      <Button href="/auth/register" variant="default" class="text-md h-full">Регистрирай се</Button>
      <DarkModeToggle />
    </div>
  </nav>
  <Separator />
</header>
<main class="h-[2000px] px-4">
  <div class="flex flex-col items-center justify-center gap-8">
    <img src={heroImg} alt="hero" class="dark:mix-blend-difference sm:h-[400px]" />
    <h1 class="text-balance text-center text-4xl font-bold text-foreground">
      <span class="text-primary">todo.bg</span>
      - Организирай деня си с лекота!
    </h1>
    <p class="w-3/4 text-balance text-center text-lg text-muted-foreground">
      Опрости и организирай деня си с нашето интуитивно приложение с изчистен дизайн, което ще
      синхронизира всичките ти задачи и проекти на едно място.
    </p>
    <Button size="lg" class="text-lg font-bold" href="/app">Започни сега</Button>
  </div>
</main>
<footer class="w-full bg-card">
  <Separator />
  <div class="flex flex-col gap-12 px-32 pb-8 pt-12">
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <img src={$mode == 'dark' ? darkLogo : lightLogo} alt="logo" class="w-28" />
        <div class="flex gap-2">
          <Button variant="ghost" size="icon">
            <Instagram strokeWidth={1.5} class="" />
          </Button>
          <Button variant="ghost" size="icon">
            <Twitter strokeWidth={1.5} />
          </Button>
          <Button variant="ghost" size="icon">
            <Facebook strokeWidth={1.5} />
          </Button>
        </div>
      </div>
      <Separator />
      <div>
        <Button href="/home" variant="link" class="pl-0">Начало</Button>
        <Button href="/auth/login" variant="link">Вход</Button>
        <Button href="/auth/register" variant="link">Регистрация</Button>
        <Button href="/app" variant="link">Към приложението</Button>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div class="text-sm text-muted-foreground">&copy; 2024 Todo.bg Inc.</div>
    </div>
  </div>
</footer>

<style>
</style>
