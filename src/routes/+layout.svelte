<script>
  import '../app.css';
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import { Toaster } from '$shadcn/sonner';
  import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<Toaster />

<slot />
