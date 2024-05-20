<script>
  import { Button } from '$shadcn/button/index.js';
  import { Check } from 'lucide-svelte';
  import * as Card from '$shadcn/card/index.js';

  export let taskName;
</script>

<Card.Root tag="h3" class="visible absolute left-0 top-0 w-full bg-muted/80 py-3 text-sm">
  <Card.Content class="flex gap-2 px-3">
    <Button
      variant="ghost"
      class=" group invisible flex size-5 items-center justify-center rounded-full border border-border p-[3px] hover:border-primary"
      type="submit"
    >
      <Check
        class="scale-0 text-primary transition-all duration-150 group-hover:scale-100"
        strokeWidth={4}
      />
    </Button>
    <div class="invisible flex-1">
      {taskName}
    </div>
  </Card.Content>
</Card.Root>
