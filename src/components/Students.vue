<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <q-toolbar>
        <q-select v-model="selectedClass" :options="classes"
                  class="col-4"
                  option-value="id"
                  :option-label="(o) => o.number + ' ' + o.liter"
                  label="Класс"
        />
        <q-select v-model="selectedSubject" class="col-4"
                  :options="subjects"
                  option-value="id"
                  :option-label="(o) => o.title"
                  label="Предмет"
        />

        <q-field
            class="col-4"
            style="cursor: pointer"
            label="Период" stack-label
        >
          <q-menu v-model="showDatePicker">
            <q-date v-model="selectedDate"
                    minimal
                    default-view="Months"
                    years-in-month-view
                    emit-immediately
                    mask="YYYY-MM"
                    ref="rDate"
                    @update:model-value="onDatepickerUpdate"
            ></q-date>
          </q-menu>
          {{ selectedDate }}
        </q-field>

      </q-toolbar>
    </div>

      <q-card class="q-ma-md" center>
        <q-card-section >
          <div class="q-pa-md">
            <q-markup-table>
              <thead>
              <tr>
                <th>Фамилия Имя</th>
                <th v-for="day in getDays(selectedDate)">{{ day }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in students" :key="item.student.id">
                <td>{{ item.student.lastName + ' ' + item.student.firstName }}</td>
                <td v-for="day in getDays(selectedDate)"> {{ getGrades(item,day,selectedDate) }} </td>
              </tr>
              </tbody>
            </q-markup-table>
          </div>
        </q-card-section>
      </q-card>

  </q-page>
</template>

<script setup>
import {useStudents} from "../composables/useStudents";
import {useClasses} from "../composables/useClasses";
import {useSubjects} from "../composables/useSubjects";

let selectedClass = $ref(null)
let selectedSubject = $ref(null)
let selectedDate = $ref(null)
let showDatePicker= $ref(false)
let rDate = $ref(null)

const {getClassAndGrades} = useStudents($$(selectedClass))
const {classes} = $(useClasses())
const {subjects} = $(useSubjects($$(selectedClass)))
let students = $ref([])
let grade = $ref(null)

async function onDatepickerUpdate(_v,reason) {
  rDate.setView('Months')
  if(reason==='month') showDatePicker = false
  students = await getClassAndGrades(selectedClass.id,selectedSubject.id,selectedDate)
}
function getDays() {
  let newDate = new Date(selectedDate)
  let lastDay = new Date(newDate.getFullYear(), newDate.getMonth()+1, 0).getDate()
  let daysArr = []
  let c = 0
  for(let i = 1; i <= lastDay; i++) {
    daysArr[c] = i
    c++
  }
  return daysArr
}
// !
function getGrades(item, day, selectedDate) {
  grade = item.grades.find(g => g.date === (selectedDate+'-'+day))
  if(grade == null)
    return '-'
  else
    return grade.grade
}

</script>

<style scoped>

</style>