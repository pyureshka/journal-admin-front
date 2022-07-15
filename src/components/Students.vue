<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        Имя
      </th>
      <th class="text-left">
        Фамилия
      </th>
      <th class="text-left">
        Открыть
      </th>
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
        <router-link to="">
          <v-btn
              variant="outlined"
              icon=""
              color="secondary"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </router-link>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
import client from "../api/http-client";

export default {
  name: "Students",
    data() {
      return {
        students: null
      };
    },
    mounted() {
      client
          .get('students?classId='+this.$route.params.id)
          .then(response => (this.students = response.data));
    }
}
</script>

<style scoped>

</style>