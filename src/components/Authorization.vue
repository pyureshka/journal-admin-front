<template>
  <q-page class="q-pa-sm">
    <div class="row justify-center">
      <q-card class="q-ma-md col-3" center>
        <q-form @submit="onAuth(log, pwd)">
          <q-card-section class="text-h5 text-deep-purple-5 text-center">
            Войти в систему
          </q-card-section>
          <div class="q-pa-md">
            <q-card-section class="row items-center">
              <q-input
                v-model="log"
                label="Логин"
                class="col-12"
                :rules="[(val) => val != null || 'Обязательное поле!']"
              />
            </q-card-section>

            <q-card-section class="row items-center">
              <q-input
                v-model="pwd"
                label="Пароль"
                type="password"
                class="col-12"
                :rules="[(val) => val != null || 'Обязательное поле!']"
              />
            </q-card-section>
          </div>
          <q-card-actions align="center">
            <q-btn
              flat
              label="Войти"
              color="deep-purple-5 bg-light-green-2"
              type="confirm"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useAuth } from "../composables/useAuth";
import { router } from "../router/router";

let log = $ref(null);
let pwd = $ref(null);
let { login } = $(useAuth());

async function onAuth(log, pwd) {
  await login(log, pwd);
  router.push("/journal");
}
</script>
