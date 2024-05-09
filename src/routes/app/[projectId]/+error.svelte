<script>
  import errorDrawing from '$assets/banners/error-illustration.svg';
  import { Button } from '$shadcn/button/index.js';
</script>

<div class="mt-28 flex h-svh flex-col items-center gap-6">
  <img src={errorDrawing} alt="Error" draggable="false" class="w-96" />
  <div class="flex flex-col gap-2">
    <h1 class="text-center text-xl font-bold text-foreground">Проектът не е намерен</h1>
    <p class="text-md w-[26ch] text-center text-muted-foreground">
      Този проект не съществува или нямате нужните права, за да го достъпите.
    </p>
  </div>
  <Button variant="default" class="font-bold" href="/app">Към началото</Button>
</div>
