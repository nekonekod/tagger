import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/ipcTest',
            name: 'ipc-test',
            component: require('@/components/IpcTest').default
        },
        {
            path: '/taggerIndex',
            name: 'tagger-index',
            component: require('@/components/TaggerIndex').default
        },
        {
            path: '/',
            // name: 'landing-page',
            component: require('@/components/LandingPage').default,
            children: [{
                path: '',
                component: require('@/components/LandingPage/ImgList').default,
            }]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})