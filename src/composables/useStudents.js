import client from "../api/http-client";
import { watch } from "vue";

function getStudents(params) {
    return client
        .get('students', { params })
        .then(response => response.data);
}

function deleteStudent(id) {
    return client
        .delete('students/delete/' + id)
}

function editStudent(student) {
    return client.put('/students/' + student.id, student).then(r => r.data)
}

function getClassAndGrades(classId, subId, period) {
    return client
        .get('/grades?classId=' + classId + '&subjectId=' + subId + '&period=' + period)
        .then(response => response.data)
        .then((data) => {
            return data.map(row => {
                row.grades = row.grades.reduce((acc, grade) => {
                    acc[grade.date] = grade
                    return acc
                }, {})

                return row
            })
        })
}

function createStudent(newStudent) {
    return client.post('students/add', newStudent).then(r => r.data)
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