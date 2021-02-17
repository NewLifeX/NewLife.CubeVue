import Vue from 'vue'
import Element from 'element-ui'
import App from './App.vue'
import Store from './store'
import Router from './router'

import * as ApiEntity from '@/api/entity'

import '@/styles/index.scss' // global css

const files = require.context('@/views/', true, /^.*\.vue$/)
Store.dispatch('setFiles', files)

export { Vue, Element, App, Store, Router, ApiEntity }
