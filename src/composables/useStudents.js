import client from "../api/http-client";
import {onMounted} from "vue";

function getStudents() {
    return client
        .get('students?classId='+this.$route.params.id)
        .then(response => response.data);
}
function deleteStudent(id) {
    return client
        .delete('students/'+id)
        .then(response =>  response.data)
}

export function useStudents() {
    let students = $ref(null)

    onMounted(async () => {
        students = await getStudents()
    })

    return $$({
        students
    })
}