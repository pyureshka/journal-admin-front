import {watch} from "vue/dist/vue";
import {router} from "../router/router";

export function useRoutes(query, mainClass) {
    watch(router.currentRoute,(route) => {
        query =  mainClass.find(c => c.id === route.query.id)
    })

    watch(() => query,(q) => {
        router.push({query: {id: q.id}})
     })
}
