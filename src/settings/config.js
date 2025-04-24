import { createApp } from "vue";
import pinia from "../stores/pinia";
import App from "./App.vue";
import { vMaska } from "maska"
import Notifications from '@kyvg/vue3-notification'
import Antd from 'ant-design-vue';

export async function handleSettings(amocrm, appElement) {
    const app = createApp(App);
    app.use(pinia);
    app.use(Antd);
    document.querySelector('.widget_settings_block').style.display = 'none'; // hide this element
    $(appElement[0]).append('<div id="vue-app-dispatch"></div>'); // add new div here and set id vue-app-dispatch

    app.provide('amocrm', amocrm);
    app.use(Notifications)
    app.directive("maska", vMaska)
    app.mount('#vue-app-dispatch');
}
