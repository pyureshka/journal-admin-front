<template>
  <q-dialog v-model="confirm" ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <q-form
          @submit="onOKClick"
          @reset="onDialogCancel"
      >
        <q-card-section class="text-h5 text-deep-purple-5 text-center">
          Добавить новый предмет
        </q-card-section>
        <q-card-section class="row items-center">
          <q-input v-model="enteredTitle"
                   label="Название"
                   class="col-12"
                   :rules="[ val => val != null || 'Обязательное поле!']"
          />
        </q-card-section>

        <q-card-section class="row items-center">
          <q-select v-model="selectedClasses"
                    :options="classes"
                    class="col-12"
                    option-value="id"
                    :option-label="(o) => o.number + ' ' + o.liter"
                    label="Классы"
                    multiple
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
import {useDialogPluginComponent} from "quasar";
import {useClasses} from "../composables/useClasses";

let enteredTitle = $ref(null)
let selectedClasses = $ref([])

const {dialogRef, onDialogOK, onDialogCancel} = useDialogPluginComponent()
const {classes} = $(useClasses())

function onOKClick() {
  let newClass = {
    title: enteredTitle,
    classItems: selectedClasses.map((c) => c.id)
  }
  console.log(newClass)
  onDialogOK(newClass)
}

function onCancelClick() {
  onDialogCancel()
}

</script>

<style scoped>

</style>