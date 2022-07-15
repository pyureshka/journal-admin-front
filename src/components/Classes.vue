<template>
  <v-table>
    <thead>
  <tr>
    <th class="text-left">
      Класс
    </th>
    <th class="text-left">
      Литер
    </th>
    <th class="text-left">
      Открыть
    </th>
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
        <router-link :to="'/'+item.id">
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
  name: "Classes",
  data() {
    return {
      classes: null
    };
  },
  mounted() {
    client
        .get('classes')
        .then(response => (this.classes = response.data));
  },
  methods: {
  }
}
</script>

<style scoped>

</style>