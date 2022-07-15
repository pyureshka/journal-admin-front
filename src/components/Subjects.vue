<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        Название предмета
      </th>
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
</template>

<script>
import client from "../api/http-client";

export default {
  name: "Subjects",
  data() {
    return {
      subjects: null
    };
  },
  mounted() {
    client
        .get('subjects')
        .then(response => (this.subjects = response.data));
  }
}
</script>

<style scoped>

</style>