<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated className="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer"/>
        
        <q-toolbar-title>
          {{ rName }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <q-list bordered separator>
        <q-item clickable v-ripple router-link to="/journal">
          <q-item-section>Журнал</q-item-section>
        </q-item>

        <q-item clickable v-ripple router-link to="/classes">
          <q-item-section>
            <q-item-label>Классы</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple router-link to="/subjects">
          <q-item-section>
            <q-item-label>Предметы</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container style="padding-top: 0">
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import {computed, ref} from 'vue'
import {router} from "./router/router";

const leftDrawerOpen = ref(false)
let rName = computed(()=>router.currentRoute.value.name)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>