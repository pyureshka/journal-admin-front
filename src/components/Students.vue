<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <q-toolbar>
        <q-select v-model="selectedClass" :options="classes"
                  class="col-4"
                  option-value="id"
                  :option-label="(o) => o.number + ' ' + o.liter"
                  label="Класс"/>
        <q-select v-model="selectedSubject" class="col-4"
                  :options="subjects"
                  option-value="id"
                  :option-label="(o) => o.title"
                  label="Предмет"/>

        <q-field
            class="col-4"
            style="cursor: pointer"
            label="Период" stack-label
            >
          <q-menu>
            <q-date v-model="selectedDate"
                    minimal
                    default-view="Months"
                    years-in-month-view
                    emit-immediately
                    mask="YYYY/MM"
                    ref="rDate"
                    @update:model-value="$refs.rDate.setView('Months')"
            ></q-date>
          </q-menu>
          {{ selectedDate }}
        </q-field>

      </q-toolbar>
    </div>

      <q-card class="q-ma-md" center>
        <q-card-section >
          <div class="q-pa-md">
            <q-table
                class="my-sticky-column-table"
                :rows="rows"
                :columns="columns"
                row-key="name"
            />
          </div>
        </q-card-section>
      </q-card>

  </q-page>
</template>

<script setup>
import {useStudents} from "../composables/useStudents";
import {useClasses} from "../composables/useClasses";
import {useSubjects} from "../composables/useSubjects";
import {useGrades} from "../composables/useGrades";

let selectedClass = $ref(null)
let selectedSubject = $ref(null)
let selectedDate = $ref(null)

const {students, deleteStudent} = useStudents($$(selectedClass))
const {classes} = $(useClasses())
const {subjects} = $(useSubjects($$(selectedClass)))

const month = []

// const { years, month } = $(useGrades($$(selectedYear)))

</script>

<style scoped>

</style>