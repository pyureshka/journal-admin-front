import {createRouter, createWebHashHistory} from "vue-router/dist/vue-router";
import Classes from "../components/Classes.vue";
import Subjects from "../components/Subjects.vue";
import Students from "../components/Students.vue";

const routes = [
    { path: '/students', component: Students},
    { path: '/subjects', component: Subjects},
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})