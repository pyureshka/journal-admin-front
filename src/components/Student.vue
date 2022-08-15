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
        <q-space />

        <q-btn flat @click="onCreateStudent" class="text-deep-purple-5">
          <q-icon name="mdi-plus" size="sm" color="deep-purple-5" />
          Добавить
        </q-btn>
      </q-toolbar>
    </div>

    <div class="row justify-center">
      <q-card class="q-ma-md col-6" center>
        <q-card-section>
          <div class="q-pa-md">
            <q-markup-table>
              <thead class="bg-light-green-2">
                <tr>
                  <th>Фамилия</th>
                  <th>Имя</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in studentsRef"
                  :key="row.id"
                  class="text-center"
                  @click="onEditStudent(row)"
                >
                  <td class="cursor-pointer name-hover">{{ row.lastName }}</td>
                  <td class="cursor-pointer name-hover">{{ row.firstName }}</td>
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
import { useClasses } from "../composables/useClasses";
import { useStudents } from "../composables/useStudents";
import StudentFormAdd from "./form-add/StudentFormAdd.vue";
import StudentFormEdit from "./form-edit/StudentFormEdit.vue";
import { useQuasar } from "quasar";

let selectedClass = $ref(null);
let studentsRef = $ref([]);

let { classes } = $(useClasses());
let { createStudent, getStudents, editStudent } = useStudents(
  $$(selectedClass)
);
const $q = useQuasar();

watch(
  () => classes,
  (classes) => (selectedClass = classes[0])
);

watch(
  () => selectedClass,
  async (c) => {
    studentsRef = await getStudents(c.id);
  }
);

function onCreateStudent() {
  $q.dialog({
    component: StudentFormAdd,
  })
    .onOk(async (data) => {
      await createStudent(data);
      studentsRef = await getStudents(selectedClass.id);
    })
    .onCancel(() => {
      console.log("Cancel");
    });
}

function onEditStudent(item) {
  $q.dialog({
    component: StudentFormEdit,
    componentProps: {
      item,
    },
  })
    .onOk(async (data) => {
      await editStudent(data);
      studentsRef = await getStudents(selectedClass.id);
    })
    .onCancel(async (data) => {
      studentsRef = await getStudents(selectedClass.id);
    });
}

function test() {
  debugger;
}
</script>
