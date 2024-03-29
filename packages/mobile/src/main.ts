import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

// vant ui global css
import Vant from 'vant';
import 'vant/lib/index.css';

// Styles are imported via arco-plugin. See config/plugin/arcoStyleImport.ts in the directory for details
// 样式通过 arco-plugin 插件导入。详见目录文件 config/plugin/arcoStyleImport.ts
// https://arco.design/docs/designlab/use-theme-package
import '@/api/interceptor';
import '@/assets/style/global.less';
import '@/assets/style/variables.less';
import '@/assets/style/tailwind.css';

import globalComponents from '@/components';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import './mock';
import App from './App.vue';

// uno
// import 'virtual:uno.css';

const app = createApp(App);

app.use(ArcoVue, {});
app.use(ArcoVueIcon);

app.use(Vant);

app.use(router);
app.use(store);
app.use(i18n);
app.use(globalComponents, {
  // use iconfont with symbol
  iconfont: '//at.alicdn.com/t/c/font_3394024_p9you3ab98.js',
});
app.use(directive);

app.mount('#app');
