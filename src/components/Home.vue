<template>
  <v-app-bar
      app
      flat
  >
    <v-container class="py-0 fill-height">
      <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
      />
    </v-container>
  </v-app-bar>

  <v-main class="main">
    <v-container>
      <v-row>
        <v-col>
          <router-view/>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
</script>

<style scoped>
.main {
  background-color: #dbdcff;
}
</style>
