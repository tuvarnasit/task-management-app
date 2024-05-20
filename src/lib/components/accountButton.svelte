<script>
  import * as DropdownMenu from '$shadcn/dropdown-menu/index.js';
  import { Button } from '$shadcn/button/index.js';
  import * as Avatar from '$shadcn/avatar/index.js';
  import { ChevronDown, LogOut, UserCog } from 'lucide-svelte';
  let isDropdownOpen = false;

  export let user;
</script>

<DropdownMenu.Root class="flex-1" bind:open={isDropdownOpen}>
  <DropdownMenu.Trigger class="w-full">
    <Button
      class="flex w-full items-center justify-start gap-3 bg-card px-2 pl-4"
      variant="outline"
    >
      <Avatar.Root class="size-6 outline outline-2 outline-offset-1 outline-primary">
        <Avatar.Image
          src="https://ui-avatars.com/api/?name={user.name}&background=random"
          alt="profile pic"
        />
        <Avatar.Fallback>{user.initials}</Avatar.Fallback>
      </Avatar.Root>
      <div class="flex-1 text-left font-bold">
        {user.firstName}
      </div>
      <ChevronDown size={18} strokeWidth={3} class="focus:outline-none" />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-64 shadow-md">
    <DropdownMenu.Group>
      <DropdownMenu.Item>
        <Button
          href="/app/profile"
          class="flex w-full items-center justify-start gap-2"
          variant="ghost"
          size="xs"
        >
          <div class="text-muted-foreground">
            <UserCog strokeWidth={2} size={18} />
          </div>
          <div>Моят профил</div>
        </Button>
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>
        <Button
          href="/auth/logout"
          class="flex w-full items-center justify-start gap-2 text-destructive hover:text-destructive/80"
          variant="ghost"
          size="xs"
        >
          <div class="">
            <LogOut strokeWidth={2} size={18} />
          </div>
          <div>Изход</div>
        </Button>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
