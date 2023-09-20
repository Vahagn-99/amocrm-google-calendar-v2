import { createApp } from "vue";
import pinia from "../stores/pinia";
import App from "./App.vue";
import ErrorHendler from '../components/ErrorHendler.vue'
import { vMaska } from "maska"
import Notifications from '@kyvg/vue3-notification'
import { async } from '../helpers/helpers';

export async function handlePanel(amocrm, appElement) {
    appElement.classList.add('dct-settings-app'); // Add the class to the element
    try {
        await async(amocrm);
        const app = createApp(App);
        app.use(pinia);
        app.provide('amocrm', amocrm);
        app.use(Notifications)
        app.directive("maska", vMaska)
        app.mount('.dct-settings-app');
    } catch (error) {
        const errorHandler = createApp(ErrorHendler);
        errorHandler.provide('error', error);
        errorHandler.mount('.dct-settings-app');
    }
}