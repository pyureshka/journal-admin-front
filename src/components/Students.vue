<template>
<q-page>
  <q-toolbar>
    <q-select v-model="selectedClass" :options="classes" label="Класс" />
    <q-select v-model="selectedSubject" :options="subjects" label="Предмет" />

  </q-toolbar>
</q-page>
</template>

<script setup>
import {useStudents} from "../composables/useStudents";
import {useClasses} from "../composables/useClasses";
import {useSubjects} from "../composables/useSubjects";
import {useGrades} from "../composables/useGrades";

let selectedClass = $ref(null)
let selectedSubject = $ref(null)
let selectedMonth = $ref(null)

const { students, deleteStudent } = useStudents($$(selectedClass))
const { classes } = $(useClasses())
const { subjects } = $(useSubjects($$(selectedClass)))

const month = []

// const { years, month } = $(useGrades($$(selectedYear)))

</script>

<style scoped>

</style>