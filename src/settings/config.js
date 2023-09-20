import { createApp } from "vue";
import pinia from "../stores/pinia";
import App from "./App.vue";
import ErrorHendler from '../components/ErrorHendler.vue'
import { vMaska } from "maska"
import Notifications from '@kyvg/vue3-notification'
import { async } from '../helpers/helpers';
import apiClient from "../../apiClient";

export async function handleSettings(amocrm, appElement) {
    const app = createApp(App);
    app.use(pinia);

    document.querySelector('.widget_settings_block').style.display = 'none'; // hide this element
    $(appElement[0]).append('<div id="vue-app-dispatch"></div>'); // add new div here and set id vue-app-dispatch

    try {
        const subdomainId = await async(amocrm);
        // Check if subdomain exists
        if (subdomainId) {
            // Get subdomainId from the server
            const { data: { data: { status: isInstalled } } } = await apiClient.get(`status/${subdomainId}`, { byWidgetId: true });

            if (isInstalled) {
                app.provide('amocrm', amocrm);
                app.use(Notifications)
                app.directive("maska", vMaska)
                app.mount('#vue-app-dispatch');
            }
        }
    } catch (error) {
        const errorHandler = createApp(ErrorHendler);
        errorHandler.provide('error', error);
        errorHandler.mount('.vue-app-dispatch');
    }
}
