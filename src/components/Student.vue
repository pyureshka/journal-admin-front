<template>
  <q-page class="q-pa-sm">
    <div class="row justify-center">
      <q-toolbar class="col-10 q-ma-md">
        <q-select
          v-model="params.classId"
          :options="classes"
          class="col-2 q-pa-sm"
          option-value="id"
          :option-label="(o) => o.number + ' ' + o.liter"
          emit-value
          map-options
          label="Класс"
        />

        <q-select
          v-model="params.archive"
          :options="optionsArchiveFilter"
          class="col-2 q-pa-sm"
          label="Ученики"
          emit-value
          map-options
          clearable
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
                  <th>Активность</th>
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
                  <td>
                    <q-icon
                      v-if="row.archive === false"
                      name="mdi-account-check-outline"
                      color="light-green-4"
                      size="sm"
                    />
                    <q-icon
                      v-else
                      name="mdi-account-cancel-outline"
                      color="amber-5"
                      size="sm"
                    />
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
import { useClasses } from "../composables/useClasses";
import { useStudents } from "../composables/useStudents";
import StudentFormAdd from "./form-add/StudentFormAdd.vue";
import StudentFormEdit from "./form-edit/StudentFormEdit.vue";
import { useQuasar } from "quasar";

let selectedClass = $ref(null);
let studentsRef = $ref([]);

let { classes } = $(useClasses());
let { params, optionsArchiveFilter, createStudent, getStudents, editStudent } =
  $(useStudents($$(selectedClass)));
const $q = useQuasar();

watch(
  () => classes,
  (classes) => {
    params.classId = classes[0].id;
  }
);

watch(
  () => params,
  async (params) => {
    studentsRef = await getStudents(params);
  },
  { deep: true }
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
      async onUpdate() {
        studentsRef = await getStudents(params);
      },
    },
  })
    .onOk(async (data) => {
      await editStudent(data);
      studentsRef = await getStudents(params);
    })
    .onCancel(async () => {
      studentsRef = await getStudents(params);
    });
}
</script>
