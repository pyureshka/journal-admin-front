<template>
  <q-dialog v-model="confirm" ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <q-form
        @submit="onOKClick"
        @reset="onDialogCancel"
      >
        <q-card-section class="text-h5 text-deep-purple-5 text-center">
          Довавить нового ученика
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
                    :rules="[val => val != null || 'Обязательное поле!']"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Отмена" @click="onCancelClick" type="reset"  color="primary" />
          <q-btn flat label="Сохранить" color="deep-purple-5" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>

import {useClasses} from "../../composables/useClasses";
import {useDialogPluginComponent} from "quasar";

let confirm = $ref(true)
let enteredFirstName = $ref(null)
let enteredLastName = $ref(null)
let selectedClass = $ref(null)

const {classes} = $(useClasses())
const {dialogRef, onDialogOK, onDialogCancel} = useDialogPluginComponent()

function onOKClick() {
  let newStudent = {
    firstName: enteredFirstName,
    lastName: enteredLastName,
    classItem: selectedClass
  }
  onDialogOK(newStudent)
}

function onCancelClick() {
  onDialogCancel()
}

</script>

<style scoped>

</style>