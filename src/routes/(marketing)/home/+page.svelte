<script>
  import darkLogo from '$lib/assets/logos/logo-darkmode.svg';
  import lightLogo from '$lib/assets/logos/logo-lightmode.svg';
  import { mode } from 'mode-watcher';
  import { Button } from '$shadcn/button/index.js';
  import DarkModeToggle from '$components/darkModeToggle.svelte';
  import { Separator } from '$shadcn/separator/index.js';
  import * as Carousel from '$shadcn/carousel/index.js';
  import * as Card from '$shadcn/card/index.js';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import { Facebook, Instagram, Twitter } from 'lucide-svelte';
  import heroImg from '$assets/banners/hero-banner.svg';
  import milenProfilePic from '$assets/testimonials/milen_petrov.jpeg';
  import damianProfilePic from '$assets/testimonials/damian_todorov.jpeg';
  import georgiProfilePic from '$assets/testimonials/georgi_mladenov.jpeg';
  import petarProfilePic from '$assets/testimonials/petar_nikolov.jpeg';
  import svilenaProfilePic from '$assets/testimonials/svilena_ruseva.jpeg';
  import hristinaProfilePic from '$assets/testimonials/hristina_stoeva.jpeg';
  import kalinaProfilePic from '$assets/testimonials/kalina_ivanova.jpeg';

  const testimonials = [
    {
      name: 'Христина Стоева',
      avatar: hristinaProfilePic,
      message:
        'Това приложение ми помогна да подредя живота си! Преди постоянно забравях задачите си, но сега всичко е организирано и лесно достъпно.'
    },
    {
      name: 'Милен Петров',
      avatar: milenProfilePic,
      message:
        'Чудесно приложение! Помага ми да остана на върха на нещата, дори когато графикът ми е натоварен. Супер удобно!'
    },
    {
      name: 'Дамян Тодоров',
      avatar: damianProfilePic,
      message:
        'Това приложение е страхотно! Толкова е лесно за използване и ми помага да организирам задачите си по най-добрия начин.'
    },
    {
      name: 'Свиленa Русевa',
      avatar: svilenaProfilePic,
      message:
        'Това е точно това, което търсех! Приложението ми помага да следя всичките си задачи и ангажименти, без да се чувствам претоварена.'
    },
    {
      name: 'Калина Иванова',
      avatar: kalinaProfilePic,
      message:
        'Просто обожавам колко лесно е да използвам това приложение. Всичките ми задачи са на едно място и няма нужда да си водя бележки навсякъде.'
    },
    {
      name: 'Георги Младенов',
      avatar: georgiProfilePic,
      message:
        'Това приложение е просто гениално! Всичко е толкова ясно и лесно за управление. Вече не се стресирам заради забравени задачи.'
    },
    {
      name: 'Петър Николов',
      avatar: petarProfilePic,
      message:
        'Не мога да повярвам колко продуктивен съм станал, откакто започнах да ползвам това приложение. Препоръчвам го на всички!'
    }
  ];
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
  <div class="my-40 flex flex-col items-center justify-center">
    <Carousel.Root
      opts={{
        align: 'start',
        loop: true,
        skipSnaps: true,
        slidesToScroll: 2
      }}
      class="w-[86%]"
    >
      <Carousel.Content>
        {#each testimonials as { avatar, name, message }, i (i)}
          <Carousel.Item class="flex max-w-sm">
            <Card.Root class="self-stretch bg-background p-2">
              <Card.Header class="flex flex-row items-end gap-3">
                <Avatar.Root class="size-8 ring-2 ring-primary">
                  <Avatar.Image src={avatar} />
                </Avatar.Root>
                {name}
              </Card.Header>
              <Card.Content class="flex items-center justify-center">
                <span class="text-balance text-lg text-muted-foreground">"{message}"</span>
              </Card.Content>
            </Card.Root>
          </Carousel.Item>
        {/each}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel.Root>
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
