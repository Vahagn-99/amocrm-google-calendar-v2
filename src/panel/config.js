import pinia from "../stores/pinia";
import {async} from "../helpers/helpers";
import {createApp} from "vue";
import App from "./App.vue";
import Notifications from "@kyvg/vue3-notification";
import {vMaska} from "maska";
import ErrorHendler from "../components/ErrorHendler.vue";
import Antd from "ant-design-vue";

export async function handlePanel(amocrm, appElement) {
    appElement.classList.add('dct-settings-app'); // Add the class to the element
    try {
        await async(amocrm);
        const app = createApp(App);
        app.use(pinia);
        app.use(Antd);
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