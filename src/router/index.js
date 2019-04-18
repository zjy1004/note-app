import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Login'
import UserInfo from '@/views/Mine/UserInfo'
import Setting from '@/views/Mine/Setting'
import EditPsd from '@/views/Mine/EditPsd'
import StatePage from '@/components/StatePage/StatePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FirstPage',
      component: () => import('@/views/FirstPage/FirstPage')
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      redirect: '/noteIndex',
      name: 'Index',
      component: () => import('@/views/Index/Index')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register/Register')
    },
    {
      path: '/noteIndex',
      name: 'NoteIndex',
      component: () => import('@/views/NoteIndex/NoteIndex')
    },
    {
      path: '/writeNote',
      name: 'WriteNote',
      component: () => import('@/views/WriteNote/WriteNote')
    },
    {
      path: '/selfNote',
      name: 'SelfNote',
      component: () => import('@/views/SelfNote/SelfNote')
    },
    {
      path: '/moreNote',
      name: 'MoreNote',
      component: () => import('@/views/SelfNote/MoreNote')
    },
    {
      path: '/noteDetail',
      name: 'NoteDetail',
      component: () => import('@/views/NoteDetail/NoteDetail')
    },
    {
      path: '/noteSpace',
      name: 'NoteSpace',
      component: () => import('@/views/NoteSpace/NoteSpace')
    },
    {
      path: '/moreNoteSpace',
      name: 'MoreNoteSpace',
      component: () => import('@/views/NoteSpace/MoreNoteSpace')
    },
    {
      path: '/updateUserInfo',
      name: 'UpdateUserInfo',
      component: () => import('@/views/Mine/UpdateUserInfo')
    },
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('@/views/Mine/Mine')
    },
    {
      path: '/upLoader',
      name: 'UpLoader',
      component: () => import('@/views/Demo/UpLoader')
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/editPsd',
      name: 'EditPsd',
      component: EditPsd
    },
    {
      path: '/statePage',
      name: 'StatePage',
      component: StatePage
    }
  ]
})
