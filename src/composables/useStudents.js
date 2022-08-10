import client from "../api/http-client";
import {watch} from "vue";

function getStudents(classId) {
    return client
        .get('students?classId=' + classId)
        .then(response => response.data);
}

function deleteStudent(id) {
    return client
        .delete('students/'+id)
        .then(response =>  response.data)
}

function editStudent(student) {
    return client.put('/students/'+student.id, student).then(r => r.data)
}

function getClassAndGrades(classId, subId, period) {
    return client
        .get('/grades?classId='+ classId +'&subjectId='+ subId +'&period=' + period)
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
    let students = $ref(null)

    watch(classRef, async (c) => {
        students = await getStudents(c.id)
    })

    async function deleteAndUpdate(id, classId) {
        students = await deleteStudent(id, classId)
    }

    return $$({
        students,
        getClassAndGrades,
        createStudent,
        deleteStudent,
        editStudent
    })
}