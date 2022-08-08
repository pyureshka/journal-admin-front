import {createApp} from 'vue'
import {Quasar, Dialog} from 'quasar'
import quasarLang from 'quasar/lang/ru'
import iconSet from 'quasar/icon-set/mdi-v6'

// Import icon libraries
import '@quasar/extras/mdi-v6/mdi-v6.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'
import {router} from "./router/router";

const myApp = createApp(App)

myApp
    .use(Quasar, {
        iconSet: iconSet,
        plugins: {
            Dialog
        }, // import Quasar plugins and add here
        lang: quasarLang,
    })
    .use(router)


// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
