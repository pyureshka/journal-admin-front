<template>
  <v-container>
    <v-table>
      <thead>
      <tr>
        <th class="text-left">Название предмета</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in subjects"
          :key="item.id"
      >
        <td>{{ item.title }}</td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>

import {useSubjects} from "../composables/useSubjects";

const { subjects } = useSubjects()
</script>

<style scoped>

</style>