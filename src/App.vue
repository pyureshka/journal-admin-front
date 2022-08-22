<template>
  <q-layout view="hHh lpR fFf">
    <div v-if="rName !== 'Авторизация'">
      <q-header elevated className="bg-primary text-white" height-hint="98">
        <q-toolbar>
          <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer" />

          <q-toolbar-title>
            {{ rName }}
          </q-toolbar-title>
          <q-space />
          <q-btn
            color="deep-purple-1"
            text-color="deep-purple-8"
            label="выйти"
            @click="onLogout"
          />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" side="left" bordered>
        <q-list bordered separator>
          <q-item clickable v-ripple router-link to="/journal">
            <q-item-section>Журнал</q-item-section>
          </q-item>

          <q-item
            v-if="can.useClasses"
            clickable
            v-ripple
            router-link
            to="/classes"
          >
            <q-item-section>
              <q-item-label>Классы</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="can.useSubjects"
            clickable
            v-ripple
            router-link
            to="/subjects"
          >
            <q-item-section>
              <q-item-label>Предметы</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="can.useStudents"
            clickable
            v-ripple
            router-link
            to="/students"
          >
            <q-item-section>
              <q-item-label>Ученики</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
    </div>
    <q-page-container style="padding-top: 0">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from "vue";
import { router } from "./router/router";
import { useAccess } from "./composables/useAccess";
import { useAuth } from "./composables/useAuth";

let { logout } = $(useAuth());
const leftDrawerOpen = ref(false);
let { can } = $(useAccess());
let rName = computed(() => router.currentRoute.value.name);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

async function onLogout() {
  await logout();
  router.push("/login");
}
</script>