<template>
  <q-page>
    <div class="row justify-center">
      <q-toolbar class="col-10 q-ma-md">
        <q-space/>

        <q-btn flat @click="onCreateClassItem" class="text-deep-purple-5">
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
                <th>Номер</th>
                <th>Литер</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(row) in classes" :key="row.id" class="text-center name-hover cursor-pointer">
                <td @click="onEditClassItem(row)">{{ row.number }}</td>
                <td @click="onEditClassItem(row)">{{ row.liter }} </td>
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
import {useClasses} from "../composables/useClasses";
import ClassItemFormAdd from "./form-add/ClassItemFormAdd.vue";
import ClassItemFormEdit from "./form-edit/ClassItemFormEdit.vue"
import {useQuasar} from "quasar";

let {classes, getClasses, createClass,editClass} = $(useClasses())
const $q = useQuasar()

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

function onEditClassItem(item) {
  $q.dialog({
    component: ClassItemFormEdit,
    componentProps: {
      item
    }
  }).onOk(async data => {
    await editClass(data)
    classes = await getClasses()
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