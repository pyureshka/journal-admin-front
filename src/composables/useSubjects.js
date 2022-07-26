import client from "../api/http-client";
import {watch} from "vue";

function getSubjects(classId) {
    return client
        .get('subjects?classId=' + classId)
        .then(response => response.data);
}

export function useSubjects(classRef) {
    let subjects = $ref(null)

    watch(classRef, async (c) => {
        subjects = await getSubjects(c.id)
    })

    return $$({
        subjects
    })
}