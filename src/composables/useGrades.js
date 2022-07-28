import client from "../api/http-client";
import {onMounted, watch} from "vue";

function getGrades(subject, student) {
    return client
        .get('grades?subjectId='+subject+'&studentId='+student)
        .then(response =>  response.data);
}
function getAllDates() {
    return client
        .get('grades/dates')
        .then(response =>  response.data);
}
function getAllYears() {
    return client
        .get('grades/years')
        .then(response =>  response.data);
}
function getAllMonth(year) {
    return client
        .get('grades/month?year'+year)
}

export function useGrades(yearRef) {
    let grades = $ref(null)
    let years = $ref(null)
    let month = $ref(null)

    onMounted( async () => {
        years = await getAllYears()
    })
    watch(yearRef, async (y) => {
        month = await getAllMonth(y)
    })

    return $$({
        years,
        month
    })
}