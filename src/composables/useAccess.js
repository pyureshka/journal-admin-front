import { computed } from "vue";
import { store } from "../components/Store";

let { user } = $(store());

const can = $(computed(() => {
    return ({
        useJournal: user?.groups.find(g => g.name === "GROUP_ADMIN" || g.name === "GROUP_MANAGER"),
        useClasses: user?.groups.find(g => g.name === "GROUP_ADMIN"),
        useStudents: user?.groups.find(g => g.name === "GROUP_ADMIN"),
        useSubjects: user?.groups.find(g => g.name === "GROUP_ADMIN")
    })
}))

export function useAccess() {
    return $$({
        can
    })
}

