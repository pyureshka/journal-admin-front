import client from "../api/http-client";
import {onMounted} from "vue";

function getGrades(subject, student) {
    return client
        .get('grades?subjectId='+subject+'&studentId='+student)
        .then(response =>  response.data);
}
function getDates() {
    return client
        .get('grades/dates')
        .then(response =>  response.data);
}

export function useGrades() {
    let grades = $ref(null)
    let dates = $ref(null)

    onMounted( async () => {
        dates = await getDates()
    })

    return $$({
        getGrades,
        dates
    })
}