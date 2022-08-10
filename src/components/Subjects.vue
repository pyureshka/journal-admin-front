<template>
  <q-page>
    <div class="row justify-center">
      <q-toolbar class="col-10 q-ma-md">
        <q-space/>

        <q-btn flat @click="onCreateSubjects" class="text-deep-purple-5">
          <q-icon name="mdi-plus" size="sm" color="deep-purple-5"/>
          Добавить
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
                <th>Название предмета</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(row, i) in allSubjects" :key="row.id" class="text-center">
                <td @click="onEditSubjects(row)" class="cursor-pointer name-hover">{{ row.title }}</td>
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
import {useSubjects} from "../composables/useSubjects";
import {useQuasar} from "quasar";
import SubjectFormAdd from "./form-add/SubjectFormAdd.vue";
import SubjectFormEdit from "./form-edit/SubjectFormEdit.vue"

let {allSubjects, getAllSubjects, createSubject, editSubject} = $(useSubjects())

const $q = useQuasar()

function onCreateSubjects() {
  $q.dialog({
    component: SubjectFormAdd
  }).onOk(async data => {
    await createSubject(data)
    allSubjects = await getAllSubjects()
  }).onCancel(() => {
    console.log('Cancel')
  })
}

function onEditSubjects(subject) {
  $q.dialog({
    component: SubjectFormEdit,
    componentProps: {
      subject
    }
  }).onOk(async data => {
    await editSubject(data)
    allSubjects = await getAllSubjects()
  }).onCancel(() => {
    console.log('Cancel')
  })
}
</script>

<style scoped>
.name-hover:hover {
  background-color: rgba(229, 239, 216, 0.33);
}
</style>