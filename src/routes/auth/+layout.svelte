<script>
  import { slide } from 'svelte/transition';
  import { expoInOut } from 'svelte/easing';
  import { Button } from '$shadcn/button/index.js';
  import banner from '$assets/banners/login-banner.svg';

  export let data;
  const inTransitionOptions = { duration: 400, easing: expoInOut, delay: 250 };
  const outTransitionOptions = { duration: 300, easing: expoInOut };
</script>

<main class="h-svh w-full overflow-hidden bg-background lg:grid lg:grid-cols-2">
  <section class="relative grid h-full px-8 py-12 sm:place-items-center">
    <Button
      href="/"
      variant="link"
      type="submit"
      size="sm"
      class="fa fa-2xl fa-arrow-left absolute left-4 top-6 p-4 hover:no-underline"
    ></Button>
    {#key data.url}
      <div in:slide={inTransitionOptions} out:slide={outTransitionOptions}>
        <slot />
      </div>
    {/key}
  </section>
  <section class="hidden bg-muted lg:block">
    <img
      draggable="false"
      src={banner}
      alt="banner"
      width="1920"
      height="1080"
      class="h-full w-full object-contain mix-blend-multiply"
    />
  </section>
</main>
