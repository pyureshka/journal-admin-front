import client from "../api/http-client";
import { onMounted, watch } from "vue";

function getSubjects(classId) {
    return client
        .get('subjects?classId=' + classId);
}

function getAllSubjects() {
    return client.get('subjects/all')
}

function createSubject(newSubject) {
    return client.post('subjects/add', newSubject)
}

function editSubject(subject) {
    return client.put('subjects/' + subject.id, subject)
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
        allSubjects,
        getAllSubjects,
        getSubjects,
        createSubject,
        editSubject
    })
}