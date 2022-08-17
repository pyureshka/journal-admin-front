<template>
  <q-dialog v-model="mainDialog" ref="dialogRef" persistent>
    <q-card class="q-dialog-plugin">
      <q-form @submit="onOKClick">
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn
            icon="mdi-close"
            flat
            round
            dense
            v-close-popup
            class="text-deep-purple-5"
            @click="onCancel"
          />
        </q-card-section>

        <q-card-section class="text-h5 text-deep-purple-5 text-center">
          Ученик
        </q-card-section>

        <q-card-section class="row items-center">
          <q-input
            v-model="enteredFirstName"
            label="Имя"
            class="col-12"
            :rules="[(val) => val != null || 'Обязательное поле!']"
          />
        </q-card-section>

        <q-card-section class="row items-center">
          <q-input
            v-model="enteredLastName"
            label="Фамилия"
            class="col-12"
            :rules="[(val) => val != null || 'Обязательное поле!']"
          />
        </q-card-section>

        <q-card-section class="row items-center">
          <q-select
            v-model="selectedClass"
            :options="classes"
            class="col-6"
            option-value="id"
            :option-label="(o) => o.number + ' ' + o.liter"
            label="Класс"
            clearable
            :rules="[(val) => val != null || 'Обязательное поле!']"
          />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            flat
            label="Удалить"
            @click="confirm = true"
            color="red"
            v-close-popup
          />
          <q-btn
            flat
            label="Архивировать"
            color="primary"
            @click="onArchive()"
          />
          <q-btn
            flat
            label="Сохранить"
            color="deep-purple-5"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>

  <q-dialog persistent v-model="confirm">
    <q-card class="q-dialog-plugin">
      <q-form>
        <q-card-section class="text-h6 text-red-5 text-center">
          Вы уверены, что хотите удалить ученика
          {{ props.item.firstName + " " + props.item.lastName }} ?
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            flat
            label="Отмена"
            color="deep-purple-5"
            @click="onConfirmCancel()"
          />
          <q-btn
            flat
            label="Да"
            color="red"
            @click="onDeleteStudent()"
            v-close-popup
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { useClasses } from "../../composables/useClasses";
import { useStudents } from "../../composables/useStudents";
import { useGroups } from "../../composables/useGroups"

const { deleteStudent } = $(useStudents());
const { classes } = $(useClasses());
const { getGroupByName } = $(useGroups())
const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent();
const props = defineProps({ item: Object });

let enteredFirstName = $ref(props.item.firstName);
let enteredLastName = $ref(props.item.lastName);
let selectedClass = $ref(props.item.classItem);
let confirm = $ref(false);
let mainDialog = $ref(null);
let archive = $ref(props.item.archive)

async function onOKClick() {
  let groups = await getGroupByName("GROUP_STUDENTS")
  let newStudent = {
    id: props.item.id,
    firstName: enteredFirstName,
    lastName: enteredLastName,
    classItem: selectedClass,
    archive: archive,
    groups: [groups]
  };
  onDialogOK(newStudent);
  mainDialog = false;
}

function onCancel() {
  mainDialog = false;
  onDialogCancel;
}

function onDeleteStudent() {
  deleteStudent(props.item.id);
  confirm = false;
  onDialogCancel;
}

function onConfirmCancel() {
  confirm = false;
  mainDialog = true;
}

function onArchive() {
  archive = !archive
  onOKClick()
}
</script>

<style scoped>
</style>