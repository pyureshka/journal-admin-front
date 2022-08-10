<template>
  <q-dialog v-model="confirm" ref="dialogRef">
    <q-card class="q-dialog-plugin">
      <q-form
          @submit="onOKClick"
          @reset="onDialogCancel"
      >
        <q-card-section class="text-h5 text-deep-purple-5 text-center">
          Редактировать предмет
        </q-card-section>
        <q-card-section class="row items-center">
          <q-input v-model="enteredTitle"
                   label="Название"
                   class="col-12"
                   :rules="[ val => val != null || 'Обязательное поле!']"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Отмена" @click="onDialogCancel" type="reset" color="primary"/>
          <q-btn flat label="Сохранить" @keyup.enter="onOKClick" color="deep-purple-5" type="submit"/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {useDialogPluginComponent} from "quasar";

const {dialogRef, onDialogOK, onDialogCancel} = useDialogPluginComponent()
const props = defineProps({subject: Object})
let enteredTitle = $ref(props.subject.title)

function onOKClick() {
  let newSubject = {
    id: props.subject.id,
    title: enteredTitle,
  }
  onDialogOK(newSubject)
}

</script>

<style scoped>
</style>