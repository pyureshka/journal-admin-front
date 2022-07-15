import {createRouter, createWebHashHistory} from "vue-router/dist/vue-router";
import Home from "../components/Home.vue";
import Classes from "../components/Classes.vue";
import Subjects from "../components/Subjects.vue";
import Students from "../components/Students.vue";

const routes = [
    { path: '/classes', component: Classes},
    { path: '/subjects', component: Subjects},
    { path: '/:id', component: Students}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})