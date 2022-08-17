<template>
  <q-page class="q-pa-sm">
    <div class="row justify-center">
      <q-toolbar class="col-10 q-ma-md">
        <q-select
          v-model="selectedClass"
          :options="classes"
          class="col-2 q-pa-sm"
          option-value="id"
          :option-label="(o) => o.number + ' ' + o.liter"
          label="Класс"
        />

        <q-select
          v-model="selectedSubject"
          class="col-2 q-pa-sm"
          :options="subjects"
          option-value="id"
          :option-label="(o) => o.title"
          label="Предмет"
        />

        <q-field
          class="col-2 q-pa-sm cursor-pointer"
          label="Период"
          stack-label
        >
          <q-menu v-model="showDatePicker">
            <q-date
              v-model="selectedDate"
              minimal
              default-view="Months"
              years-in-month-view
              emit-immediately
              mask="YYYY-MM"
              ref="rDate"
              @update:model-value="onDatepickerUpdate"
            />
          </q-menu>
          {{ selectedDate }}
        </q-field>
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
                  <th v-for="day in getDays(selectedDate)" :key="day.id">
                    {{ new Date(day).getDate() }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in students" :key="row.student.id">
                  <td class="sticky">
                    {{ row.student.lastName + " " + row.student.firstName }}
                  </td>
                  <td
                    v-for="date in getDays(selectedDate)"
                    :key="date"
                    style="font-family: monospace"
                  >
                    <q-btn
                      flat
                      :label="Number(row.grades[date]?.grade) || '-'"
                      :class="`grade-${row.grades[date]?.grade}`"
                    >
                      <q-menu fit>
                        <q-list>
                          <q-item
                            v-for="(v, i) in [1, 2, 3, 4, 5, '-']"
                            :key="i"
                            clickable
                            v-close-popup
                            @click="changeGrade(v, row, date)"
                            class="q-pa-sm"
                            dense
                          >
                            <q-item-section class="text-center">
                              {{ v }}
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
import { watch } from "vue";
import { useStudents } from "../composables/useStudents";
import { useClasses } from "../composables/useClasses";
import { useSubjects } from "../composables/useSubjects";
import { useGrades } from "../composables/useGrades";
import { useQuasar } from "quasar";

let selectedClass = $ref(null);
let selectedSubject = $ref(null);
let selectedDate = $ref(new Date().toISOString().slice(0, 7));
let showDatePicker = $ref(false);
let rDate = $ref(null);
let students = $ref([]);

const { getClassAndGrades, createStudent } = useStudents($$(selectedClass));
let { classes, getClasses, createClass } = $(useClasses());
let { subjects, getSubjects, createSubject } = $(
  useSubjects($$(selectedClass))
);
const { updateGrade, deleteGrade, createGrade } = $(useGrades());
const $q = useQuasar();

watch(
  () => classes,
  (classes) => {
    selectedClass = classes[0];
  }
);

watch(
  () => subjects,
  async (subjects) => {
    selectedSubject = subjects[0];
    students = await getClassAndGrades(
      selectedClass.id,
      selectedSubject.id,
      selectedDate
    );
  }
);

watch(
  () => selectedSubject,
  async (selectedSubject) => {
    students = await getClassAndGrades(
      selectedClass.id,
      selectedSubject.id,
      selectedDate
    );
  }
);

async function onDatepickerUpdate(_v, reason) {
  rDate.setView("Months");
  if (reason === "month") showDatePicker = false;
  students = await getClassAndGrades(
    selectedClass.id,
    selectedSubject.id,
    selectedDate
  );
}

function getDays() {
  const date = new Date(selectedDate);
  const month = date.getMonth();
  const dates = [];

  while (date.getMonth() === month) {
    dates.push(date.toISOString().slice(0, 10));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

async function changeGrade(newValue, row, date) {
  const grade = row.grades[date];

  if (newValue === "-") {
    await deleteGrade(grade);
  } else if (grade?.grade) {
    await updateGrade({ ...grade, grade: newValue }, grade.id);
  } else {
    let obj = {
      grade: newValue,
      date: date,
      student: row.student,
      subject: selectedSubject,
    };
    await createGrade(obj);
  }

  students = await getClassAndGrades(
    selectedClass.id,
    selectedSubject.id,
    selectedDate
  );
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
  background-color: #de3838;
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