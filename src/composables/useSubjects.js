import client from "../api/http-client";
import {onMounted, watch} from "vue";

function getSubjects(classId) {
    return client
        .get('subjects?classId=' + classId)
        .then(response => response.data);
}

function getAllSubjects() {
    return client.get('subjects/all').then(r => r.data)
}

export function useSubjects(classRef) {
    let subjects = $ref(null)
    let allSubjects = $ref([])

    watch(classRef, async (c) => {
        subjects = await getSubjects(c.id)
    })

    onMounted(async () => {
        allSubjects = await getAllSubjects()
    })

    return $$({
        subjects,
        allSubjects
    })
}