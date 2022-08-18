import client from "../api/http-client";
import { watch } from "vue";

function getStudents(params) {
    return client
        .get('students', { params })
        ;
}

function deleteStudent(id) {
    return client
        .delete('students/delete/' + id)
}

function editStudent(student) {
    return client.put('/students/' + student.id, student)
}

function getClassAndGrades(classId, subId, period) {
    return client
        .get('/grades?classId=' + classId + '&subjectId=' + subId + '&period=' + period)

        .then((data) => {
            return data.map(row => {

                row.grades = row.grades.reduce((acc, grade) => {
                    grade.date = grade.date.slice(0, 10)
                    acc[grade.date] = grade
                    return acc
                }, {})

                return row
            })
        })
}

function createStudent(newStudent) {
    return client.post('students/add', newStudent)
}

export function useStudents(classRef) {
    let params = $ref({
        archive: undefined,
    })

    let optionsArchiveFilter = [
        { label: "Действующие", value: false },
        { label: "Архивные", value: true },
    ];

    return $$({
        params,
        optionsArchiveFilter,

        getClassAndGrades,
        createStudent,
        deleteStudent,
        getStudents,
        editStudent,
    })
}