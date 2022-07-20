<template>
  <v-container>
    <v-row>
      <v-toolbar rounded="lg">
        <v-col cols="3">
          <br>
          <v-select
              variant="solo"
              density="compact"
              :items="classes"
              :item-title="(c) => c.number + ' ' + c.liter"
              :item-value="(c) => c"
              v-model="selectedClass"
          />
        </v-col>
      </v-toolbar>
    </v-row>

    <br>
    <v-sheet rounded="lg">
      <v-table >
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th></th>
            <th></th>
            <th></th>
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
        </tr>
        </tbody>
      </v-table>
    </v-sheet>
  </v-container>
</template>

<script setup>
import {useStudents} from "../composables/useStudents";
import {useClasses} from "../composables/useClasses";
import {watch} from "vue";
import {router} from "../router/router";

let selectedClass = $ref(null)

watch(() => selectedClass, (c) => {
  router.push({query: { classId: c.id }})
})

const { students, deleteStudent } = useStudents($$(selectedClass))
const { classes } = $(useClasses())

watch(router.currentRoute, (route) => {
  selectedClass = classes.find(c => c.id === route.query.classId)
})

</script>

<style scoped>

</style>