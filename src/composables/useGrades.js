import client from "../api/http-client";


function updateGrade(grade, id) {
    return client
        .put('/grades/' + id, grade)

}

function deleteGrade(grade) {
    return client.delete('/grades/' + grade.id)
}

function createGrade(grade) {
    return client.post('/grades/add', grade)
}

export function useGrades() {
    return $$({
        updateGrade,
        deleteGrade,
        createGrade
    })
}