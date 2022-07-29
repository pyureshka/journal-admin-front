<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated className="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          <q-avatar></q-avatar>
          Журнал
        </q-toolbar-title>
      </q-toolbar>

    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container style="padding-top: 0">
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import {ref} from 'vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>