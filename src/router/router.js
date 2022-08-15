import {createRouter, createWebHashHistory} from "vue-router/dist/vue-router";
import Journal from "../components/Journal.vue";
import Classes from "../components/Classes.vue"
import Subjects from "../components/Subjects.vue";
import Students from "../components/Student.vue"

const routes = [
    {path: '/journal', component: Journal, name: 'Журнал'},
    {path: '/classes', component: Classes, name: 'Классы'},
    {path: '/subjects', component: Subjects, name: 'Предметы'},
    {path: '/students', component: Students, name: 'Ученики'}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})