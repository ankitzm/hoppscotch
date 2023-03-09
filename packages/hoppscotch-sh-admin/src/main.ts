import { createApp } from 'vue';
import urql, { createClient } from '@urql/vue';
import App from './App.vue';

// STYLES
import 'virtual:windi.css';
import '@hoppscotch/ui/style.css';
import '../assets/scss/themes.scss';
import '../assets/scss/styles.scss';
// END STYLES

import { HOPP_MODULES } from './modules';
import { auth } from './helpers/auth';

const app = createApp(App).use(
  urql,
  createClient({
    url: import.meta.env.VITE_BACKEND_GQL_URL,
    fetchOptions: () => {
      return {
        credentials: 'include',
      };
    },
  })
);

// Initialize auth
await auth.performAuthInit();

// Initialize modules
HOPP_MODULES.forEach((mod) => mod.onVueAppInit?.(app));

app.mount('#app');
