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
        <v-col cols="2">
          <v-list rounded="lg">
            <v-list-item router-link to="/students">
              <v-list-item-title>Ученики</v-list-item-title>
            </v-list-item>
            <v-list-item router-link to="/subjects">
              <v-list-item-title>- Предметы -</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col>
          <router-view />
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
