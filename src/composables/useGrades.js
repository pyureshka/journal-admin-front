import client from "../api/http-client";


function updateGrade(grade, id) {
    return client
        .put('/grades/'+id,grade)
        .then(r => r.data)
}

function deleteGrade(grade) {
    client.delete('/grades/'+grade.id)
}

export function useGrades() {
    return $$({
        updateGrade,
        deleteGrade
    })
}