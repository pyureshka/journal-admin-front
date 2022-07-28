import client from "../api/http-client";
import {watch} from "vue";

function getStudents(classId) {
    return client
        .get('students?classId=' + classId)
        .then(response => response.data);
}
function deleteStudent(id, classId) {
    client
        .delete('students/'+id)
        .then(response =>  response.data)
    return client
        .get('students?classId=' + classId)
        .then(response => response.data);
}

export function useStudents(classRef) {
    let students = $ref(null)

    watch(classRef, async (c) => {
        students = await getStudents(c.id)
    })

    async function deleteAndUpdate(id, classId) {
        students = await deleteStudent(id, classId)
    }

    return $$({
        students,
        deleteStudent
    })
}