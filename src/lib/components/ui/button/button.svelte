<script>
  import { Button as ButtonPrimitive } from 'bits-ui';
  import { buttonVariants } from './index.js';
  import { cn } from '$lib/utils.js';

  let className = undefined;
  export let variant = 'default';
  export let size = 'default';
  export let type = 'button';
  export let builders = [];
  export let disabled = false;
  export { className as class };
</script>

<ButtonPrimitive.Root
  {builders}
  class={cn(
    buttonVariants({ variant, size, className }),
    'transition-colors duration-150 ease-in-out '
  )}
  {type}
  {...$$restProps}
  on:click
  on:keydown
  {disabled}
>
  <slot />
</ButtonPrimitive.Root>
