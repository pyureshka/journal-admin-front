<template>
  <v-app-bar
      app
      color="#92bfbd52"
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

  <v-main>
    <v-container>

      <v-row>
        <v-col cols="2">
          <v-sheet rounded="lg">
            <v-list color="#92bfbd52" rounded="lg">
              <v-list-item link="">
                  <v-list-item-title>Классы</v-list-item-title>
              </v-list-item>
	            <v-list-item link="">
		              <v-list-item-title>Предметы</v-list-item-title>
	            </v-list-item>
	            <v-list-item link="">
	              <v-list-item-title>Ученики</v-list-item-title>
	            </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet
              min-height="70vh"
              rounded="lg"
              color="#92bfbd52"
          >
            {{ classes }}
          </v-sheet>
        </v-col>
      </v-row>

    </v-container>
  </v-main>
</template>

<script>
import client from "../api/http-client";

export default {
	data() {
		return {
			classes: null
		};
	},
	mounted() {
		client
				.get('classes')
				.then(response => (this.classes = response));
	}
}
</script>

<style lang="scss">

</style>