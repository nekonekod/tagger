import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ipcTest',
      name: 'ipc-test',
      component: require('@/components/IpcTest').default
    },
    {
      path: '/',
      name: 'tagger-index',
      component: require('@/components/TaggerIndex').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
