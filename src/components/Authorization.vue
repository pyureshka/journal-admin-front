<template>
  <q-page class="q-pa-sm">
    <div class="row justify-center">
      <q-card class="q-ma-md col-3" center>
        <q-card-section>
          <div class="q-pa-md">
            <q-card-section class="row items-center">
              <q-input
                v-model="login"
                label="Логин"
                class="col-12"
                :rules="[(val) => val != null || 'Обязательное поле!']"
              />
            </q-card-section>

            <q-card-section class="row items-center">
              <q-input
                v-model="password"
                label="Пароль"
                class="col-12"
                :rules="[(val) => val != null || 'Обязательное поле!']"
              />
            </q-card-section>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            flat
            label="Войти"
            color="deep-purple-5 bg-light-green-2"
            @click="onAuth()"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
let login = $ref(null);
let password = $ref(null);

function onAuth() {}
</script>

