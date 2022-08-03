<template>
  <q-page class="q-pa-sm">

    <div class="row">
      <q-toolbar>
        <q-select v-model="selectedClass" :options="classes"
                  class="col-4"
                  option-value="id"
                  :option-label="(o) => o.number + ' ' + o.liter"
                  label="Класс"/>
        <q-select v-model="selectedSubject" class="col-4"
                  :options="subjects"
                  option-value="id"
                  :option-label="(o) => o.title"
                  label="Предмет"/>
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
              <thead class="bg-light-green-2">
              <tr>
                <th class="sticky">Фамилия Имя</th>
                <th v-for="day in getDays(selectedDate)">{{ new Date(day).getDate() }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(row, i) in students" :key="row.student.id">
                <td class="sticky">{{ row.student.lastName + ' ' + row.student.firstName }}</td>
                <td v-for="(date, j) in getDays(selectedDate)" :class="`grade-${row.grades[date]?.grade}`">
                  <q-select :model-value="Number(row.grades[date]?.grade) || '-'" :options="[1,2,3,4,5]" @update:model-value="updateGrade($event, row.grades[date])"  />
                </td>
              </tr>
              </tbody>
            </q-markup-table>
          </div>
        </q-card-section>
      </q-card>

  </q-page>
</template>

<script setup>
import {watch} from "vue"
import {useStudents} from "../composables/useStudents";
import {useClasses} from "../composables/useClasses";
import {useSubjects} from "../composables/useSubjects";
import {useGrades} from "../composables/useGrades";

let selectedClass = $ref(null)
let selectedSubject = $ref(null)
let selectedDate = $ref(new Date().toISOString().slice(0,7))
let showDatePicker= $ref(false)
let rDate = $ref(null)

const { getClassAndGrades } = useStudents($$(selectedClass))
const { classes } = $(useClasses())
const { subjects } = $(useSubjects($$(selectedClass)))
const { updGrade } = $(useGrades())
let students = $ref([])
// let grade = $ref(null)

watch(() => classes, classes => {
  selectedClass = classes[0]
})

watch(() => subjects, async subjects => {
  selectedSubject= subjects[0]
  students = await getClassAndGrades(selectedClass.id,selectedSubject.id,selectedDate)
})


async function onDatepickerUpdate(_v,reason) {
  rDate.setView('Months')
  if(reason==='month')
    showDatePicker = false
  students = await getClassAndGrades(selectedClass.id,selectedSubject.id,selectedDate)
}

function getDays() {
  const date = new Date(selectedDate)
  const month = date.getMonth()
  const dates = []

  while (date.getMonth() === month) {
    dates.push(date.toISOString().slice(0,10))
    date.setDate(date.getDate() + 1)
  }

  return dates
}

function updateGrade(newValue, grade) {
  debugger
}

</script>

<style scoped>
.grade-5{
background-color: #6ba26b;
}
.grade-1{
   background-color: #c72b2b;
}

thead,
tbody,
tfoot,
tr,
th,
td {
}

.sticky {
  position: sticky;
  background-color: inherit;
  background-color: white;

  z-index: 3;
  left: 0;
}

th.sticky {
  background-color: #dcedc8;
}


</style>