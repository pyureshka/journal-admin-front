<template>
  <q-page class="q-pa-sm">
    <div class="row justify-center">
      <q-toolbar class="col-10 q-ma-md">
        <q-select v-model="selectedClass"
                  :options="classes"
                  class="col-2 q-pa-sm"
                  option-value="id"
                  :option-label="(o) => o.number + ' ' + o.liter"
                  label="Класс"/>

        <q-select v-model="selectedSubject"
                  class="col-2 q-pa-sm"
                  :options="subjects"
                  option-value="id"
                  :option-label="(o) => o.title"
                  label="Предмет"/>

        <q-field
            class="col-2 q-pa-sm cursor-pointer"
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
                    @update:model-value="onDatepickerUpdate"/>
          </q-menu>
          {{ selectedDate }}
        </q-field>

        <q-space/>

        <q-btn flat>
          <q-icon name="mdi-plus" size="md" color="deep-purple-5">
            <q-menu fit>
              <q-list>
                <q-item @click="onCreateClassItem" clickable v-close-popup>
                  <q-item-section>класс</q-item-section>
                </q-item>
                <q-item @click="onCreateSubjects" clickable v-close-popup>
                  <q-item-section>предмет</q-item-section>
                </q-item>
                <q-item @click="onCreateStudent" clickable v-close-popup>
                  <q-item-section>ученик</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </q-btn>
      </q-toolbar>
    </div>

    <div class="row justify-center">
      <q-card class="q-ma-md col-10" center>
        <q-card-section>
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
                <td class="sticky cursor-pointer name-hover" @click="onEditStudent(row)">
                  {{ row.student.lastName + ' ' + row.student.firstName }}
                </td>
                <td v-for="(date, j) in getDays(selectedDate)">
                  <q-btn flat
                         :label="Number(row.grades[date]?.grade) || '-'"
                         :class="`grade-${row.grades[date]?.grade}`">
                    <q-menu :model-value="row.grades[date]?.grade" fit>
                      <q-list>
                        <q-item clickable v-close-popup @click="updGrade(1, row, date)">
                          <q-item-section class="text-center">1</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="updGrade(2, row, date)">
                          <q-item-section class="text-center">2</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="updGrade(3, row, date)">
                          <q-item-section class="text-center">3</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="updGrade(4, row, date)">
                          <q-item-section class="text-center">4</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="updGrade(5, row, date)">
                          <q-item-section class="text-center">5</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="onDeleteGrade(row.grades[date])">
                          <q-item-section>
                            <q-icon name="mdi-close" class="text-red-7 bg-red-2"/>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </td>
              </tr>
              </tbody>
            </q-markup-table>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import {watch} from "vue"
import {useStudents} from "../composables/useStudents";
import {useClasses} from "../composables/useClasses";
import {useSubjects} from "../composables/useSubjects";
import {useGrades} from "../composables/useGrades";
import StudentFormAdd from "./form-add/StudentFormAdd.vue";
import ClassItemFormAdd from "./form-add/ClassItemFormAdd.vue";
import SubjectFormAdd from "./form-add/SubjectFormAdd.vue";
import StudentFormEdit from "./form-edit/StudentFormEdit.vue"
import {useQuasar} from "quasar";

let selectedClass = $ref(null)
let selectedSubject = $ref(null)
let selectedDate = $ref(new Date().toISOString().slice(0, 7))
let showDatePicker = $ref(false)
let rDate = $ref(null)
let students = $ref([])

const {getClassAndGrades, createStudent, editStudent} = useStudents($$(selectedClass))
let {classes, getClasses, createClass} = $(useClasses())
let {subjects, getSubjects, createSubject} = $(useSubjects($$(selectedClass)))
const {updateGrade, deleteGrade, createGrade} = $(useGrades())
const $q = useQuasar()

watch(() => classes, classes => {
  selectedClass = classes[0]
})

watch(() => subjects, async subjects => {
  selectedSubject = subjects[0]
  students = await getClassAndGrades(selectedClass.id, selectedSubject.id, selectedDate)
})

async function onDatepickerUpdate(_v, reason) {
  rDate.setView('Months')
  if (reason === 'month')
    showDatePicker = false
  students = await getClassAndGrades(selectedClass.id, selectedSubject.id, selectedDate)
}

function getDays() {
  const date = new Date(selectedDate)
  const month = date.getMonth()
  const dates = []

  while (date.getMonth() === month) {
    dates.push(date.toISOString().slice(0, 10))
    date.setDate(date.getDate() + 1)
  }

  return dates
}

async function updGrade(newValue, row, date) {
  const grade = row.grades[date]
  if (grade?.grade) {
    grade.grade = newValue
    await updateGrade(grade, grade.id)
    students = await getClassAndGrades(selectedClass.id, selectedSubject.id, selectedDate)
  } else {
    let obj = {
      grade: newValue,
      date: date,
      student: row.student,
      subject: selectedSubject
    }
    await createGrade(obj)
    students = await getClassAndGrades(selectedClass.id, selectedSubject.id, selectedDate)
  }
}

async function onDeleteGrade(grade) {
  await deleteGrade(grade)
  students = await getClassAndGrades(selectedClass.id, selectedSubject.id, selectedDate)
}

function onCreateStudent() {
  $q.dialog({
    component: StudentFormAdd
  }).onOk(async data => {
    await createStudent(data)
    students = await getClassAndGrades(selectedClass.id, selectedSubject.id, selectedDate)
  }).onCancel(() => {
    console.log('Cancel')
  })
}

function onCreateClassItem() {
  $q.dialog({
    component: ClassItemFormAdd
  }).onOk(async data => {
    await createClass(data)
    classes = await getClasses()
  }).onCancel(() => {
    console.log('Cancel')
  })
}

function onCreateSubjects() {
  $q.dialog({
    component: SubjectFormAdd
  }).onOk(async data => {
    await createSubject(data)
    subjects = await getSubjects()
  }).onCancel(() => {
    console.log('Cancel')
  })
}

function onEditStudent(item) {
  $q.dialog({
    component: StudentFormEdit,
    componentProps: {
      item
    }
  }).onOk(async data => {
    await editStudent(data)
    students = await getClassAndGrades(selectedClass.id, selectedSubject.id, selectedDate)
  }).onCancel(async data => {
    students = await getClassAndGrades(selectedClass.id, selectedSubject.id, selectedDate)
  })
}

</script>

<style scoped>
.grade-5 {
  background-color: #75ce59;
}

.grade-4 {
  background-color: #b4f5b4;
}

.grade-3 {
  background-color: #ffa851;
}

.grade-2 {
  background-color: #f5adb8;
}

.grade-1 {
  background-color: #de3838
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

.name-hover:hover {
  background-color: rgba(229, 239, 216, 0.33);
}
</style>