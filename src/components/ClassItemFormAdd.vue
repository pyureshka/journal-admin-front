<template>
  <q-dialog v-model="confirm" ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <q-form
          @submit="onOKClick"
          @reset="onDialogCancel"
      >
        <q-card-section class="text-h5 text-deep-purple-5 text-center">
          Добавить новый класс
        </q-card-section>
        <q-card-section class="row items-center">
          <q-input v-model="enteredNumber"
                   label="Номер"
                   class="col-5"
                   :rules="[ val => val != null || 'Обязательное поле!']"
          />
          <q-space />
          <q-input v-model="enteredLiter"
                   label="Буква"
                   class="col-5"
                   :rules="[ val => val != null || 'Обязательное поле!']"
          />
        </q-card-section>

        <q-card-section class="row items-center">
          <q-select v-model="selectedSubjects"
                    :options="allSubjects"
                    class="col-12"
                    option-value="id"
                    :option-label="(o) => o.title"
                    label="Предметы"
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
import {useSubjects} from "../composables/useSubjects";
import {useDialogPluginComponent} from "quasar";

let enteredLiter = $ref(null)
let enteredNumber = $ref(null)
let selectedSubjects = $ref([])

const {allSubjects} = $(useSubjects())
const {dialogRef, onDialogOK, onDialogCancel} = useDialogPluginComponent()


function onOKClick() {
  let newClass = {
    number: enteredNumber,
    liter: enteredLiter,
    subjectsId: selectedSubjects.map((s) => s.id)
  }
  onDialogOK(newClass)
}

function onCancelClick() {
  onDialogCancel()
}

</script>

<style scoped>

</style>