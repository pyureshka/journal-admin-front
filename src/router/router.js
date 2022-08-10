import {createRouter, createWebHashHistory} from "vue-router/dist/vue-router";
import Journal from "../components/Journal.vue";
import Classes from "../components/Classes.vue"
import Subjects from "../components/Subjects.vue";

const routes = [
    {path: '/journal', component: Journal, name: 'Журнал'},
    {path: '/classes', component: Classes, name: 'Классы'},
    {path: '/subjects', component: Subjects, name: 'Предметы'}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})