import { tv } from 'tailwind-variants';
import Root from './button.svelte';

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm ',
      outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
      muted: 'bg-muted text-muted-foreground hover:text-foreground/80 hover:bg-muted/80 shadow-sm',
      ghost: 'hover:bg-accent text-foreground',
      text: 'hover:text-primary/90 text-primary font-bold hover:bg-accent',
      link: 'text-primary underline-offset-4 hover:underline'
    },
    size: {
      default: 'h-10 px-4 py-2',
      xs: 'h-6 px-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});
export {
  Root,
  //
  Root as Button,
  buttonVariants
};
