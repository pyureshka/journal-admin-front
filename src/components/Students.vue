<link rel="stylesheet" href="../styles/style.css">
<template>
  <v-container>
      <v-toolbar rounded="lg">
          <v-col cols="2">
            <v-select
                variant="solo"
                density="compact"
                :items="classes"
                :item-title="(c) => c.number + ' ' + c.liter"
                :item-value="(c) => c"
                v-model="selectedClass"
            />
          </v-col>

          <v-col cols="3">
            <v-select
                variant="solo"
                density="compact"
                :items="subjects"
                :item-title="(c) => c.title"
                :item-value="(c) => c"
                v-model="selectedSubject"
            />
          </v-col>
        <v-col cols="3">
          <v-select
              variant="solo"
              density="compact"
          />
        </v-col>
      </v-toolbar>

    <br>
    <v-sheet rounded="lg">
      <v-table density="compact">
        <thead>
          <tr>
            <th>имя</th>
            <th>фамилия</th>
            <th/>
            <th/>
            <th/>
            <th v-for="date in dates" :key="date">{{ date }}</th>
          </tr>
        </thead>

        <tbody>
        <tr
            v-for="item in students"
            :key="item.id"
        >
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>
            <v-btn
                variant="outlined"
                icon=""
                color="grey darken-1"
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn
                variant="outlined"
                icon=""
                color="grey darken-1"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn
                variant="outlined"
                icon=""
                color="grey darken-1"
                @click="deleteStudent(item.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
          <td></td>
        </tr>
        </tbody>
      </v-table>
    </v-sheet>
  </v-container>
</template>

<script setup>
import {useStudents} from "../composables/useStudents";
import {useClasses} from "../composables/useClasses";
import {useSubjects} from "../composables/useSubjects";
import {useGrades} from "../composables/useGrades";

let selectedClass = $ref(null)
let selectedSubject = $ref(null)

const { students, deleteStudent } = useStudents($$(selectedClass))
const { classes } = $(useClasses())
const { subjects } = $(useSubjects($$(selectedClass)))
// !
const { getGrades, dates} = $(useGrades())

</script>

<style scoped>

</style>