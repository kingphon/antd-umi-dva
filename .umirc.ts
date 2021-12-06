import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/home' },
        { path: '/location/province', component: '@/pages/location/province' },
      ],
    },
  ],
  // plugins: [
  //   // ref: https://umijs.org/plugin/umi-plugin-react.html
  //   ['umi-plugin-react', {
  //     antd: true,
  //     dva: false,
  //     dynamicImport: false,
  //     title: 'useRequest',
  //     dll: false,
      
  //     routes: {
  //       exclude: [
  //         /components\//,
  //       ],
  //     },
  //   }],
  // ],
  fastRefresh: {},
});
