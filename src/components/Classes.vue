<template>
  <v-container >
    <v-table>
      <thead>
      <tr>
        <th>Класс</th>
        <th>Литер</th>
        <th>Открыть</th>
      </tr>
      </thead>

      <tbody>
      <tr
          v-for="item in classes"
          :key="item.id"
      >
        <td>{{ item.number }}</td>
        <td>{{ item.liter }}</td>
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
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { useClasses } from "../composables/useClasses";

const { classes } = useClasses()
</script>

<style scoped>

</style>