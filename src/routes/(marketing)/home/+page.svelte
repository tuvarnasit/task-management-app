<script>
  import darkLogo from '$lib/assets/logos/logo-darkmode.svg';
  import lightLogo from '$lib/assets/logos/logo-lightmode.svg';
  import { mode } from 'mode-watcher';
  import { Button } from '$lib/components/ui/button/index.js';
  import DarkModeToggle from '$components/darkModeToggle.svelte';
  import { Separator } from '$lib/components/ui/separator/index.js';
</script>

<main>
  <header>
    <nav class="flex items-center justify-between bg-background/70 p-4 backdrop-blur sm:px-8">
      <img src={$mode == 'dark' ? darkLogo : lightLogo} alt="logo" class="w-36" />
      <div class="flex gap-2 font-bold">
        <Button href="/auth/login" variant="ghost" class="text-md h-full">Вход</Button>
        <Button href="/auth/register" variant="default" class="text-md h-full"
          >Регистрирай се
        </Button>
        <DarkModeToggle />
      </div>
    </nav>
    <Separator />
  </header>
  <footer class="absolute bottom-0 h-48 w-full bg-primary"></footer>
</main>

<style>
</style>
