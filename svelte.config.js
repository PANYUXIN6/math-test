import adapter from '@sveltejs/adapter-static'; // 静态适配器

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // SPA模式，设置fallback页面
      precompress: false,
      strict: true,
    }),
  },
};
