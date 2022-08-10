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

        <q-card-actions align="center">
          <q-btn flat label="Отмена" @click="onCancelClick" type="reset" color="primary"/>
          <q-btn flat label="Сохранить" @keyup.enter="onOKClick" color="deep-purple-5" type="submit"/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {useDialogPluginComponent} from "quasar";

let enteredTitle = $ref(null)

const {dialogRef, onDialogOK, onDialogCancel} = useDialogPluginComponent()

function onOKClick() {
  let newSubject = {
    title: enteredTitle,
  }
  onDialogOK(newSubject)
}

function onCancelClick() {
  onDialogCancel()
}

</script>

<style scoped>

</style>