import preprocess from 'svelte-preprocess'; // 预处理器
import adapter from '@sveltejs/adapter-static'; // 静态适配器
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
  },
};
