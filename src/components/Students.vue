<template>

  <v-container>
    <v-table >
      <thead>
      <tr>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Открыть</th>
        <th>Редактировать</th>
        <th>Удалить</th>
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
              router-link :to="'/'+item.id"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </td>
        <td>
          <v-btn
              variant="outlined"
              icon=""
              color="grey darken-1"
              router-link :to="'/'"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </td>
        <td>
          <v-btn
              variant="outlined"
              icon=""
              color="grey darken-1"
              router-link :to="'/'"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import {useStudents} from "../composables/useStudents";

const { students } = useStudents()
</script>

<style scoped>

</style>