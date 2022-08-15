<template>
  <q-dialog v-model="confirm" ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <q-form
          @submit="onOKClick"
          @reset="onDialogCancel"
      >
        <q-card-section class="text-h5 text-deep-purple-5 text-center">
          Ученик
        </q-card-section>
        <q-card-section class="row items-center">
          <q-input v-model="enteredFirstName"
                   label="Имя"
                   class="col-12"
                   :rules="[ val => val != null || 'Обязательное поле!']"
          />
        </q-card-section>

        <q-card-section class="row items-center">
          <q-input v-model="enteredLastName"
                   label="Фамилия"
                   class="col-12"
                   :rules="[ val => val != null || 'Обязательное поле!']"
          />
        </q-card-section>

        <q-card-section class="row items-center">
          <q-select v-model="selectedClass"
                    :options="classes"
                    class="col-6"
                    option-value="id"
                    :option-label="(o) => o.number + ' ' + o.liter"
                    label="Класс"
                    clearable
                    :rules="[val => val != null || 'Обязательное поле!']"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Отмена" color="primary" type="reset" @click="onDialogCancel"/>
          <q-btn flat label="Удалить" color="red" @click="deleteStudent(props.item.id)" v-close-popup/>
          <q-btn flat label="Сохранить" @click="onOKClick" color="deep-purple-5" type="submit"/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {useDialogPluginComponent} from "quasar";
import {useClasses} from "../../composables/useClasses";
import {useStudents} from "../../composables/useStudents";

const {deleteStudent} = $(useStudents())
const {classes} = $(useClasses())
const {dialogRef, onDialogOK, onDialogCancel} = useDialogPluginComponent()
const props = defineProps({item: Object})

let enteredFirstName = $ref(props.item.firstName)
let enteredLastName = $ref(props.item.lastName)
let selectedClass = $ref(props.item.classItem)

function onOKClick() {
  let newStudent = {
    id: props.item.id,
    firstName: enteredFirstName,
    lastName: enteredLastName,
    classItem: selectedClass
  }
  onDialogOK(newStudent)
}

</script>

<style scoped>

</style>