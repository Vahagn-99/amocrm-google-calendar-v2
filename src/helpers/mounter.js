import { createApp } from "vue";
import pinia from "../stores/pinia";
import Notifications from '@kyvg/vue3-notification'
import {useAccountStore} from "../stores/account";
import RightModal from "../render/RightModal.vue";

/**
 * Asynchronously mounts a Vue component.
 * @param {string} id - Unique identifier for the component
 * @param component
 * @param {string|HTMLElement} holder - DOM selector or HTMLElement to attach component to
 * @param {string|string[]} entityIs - Entity types that this function applies to
 * @param append
 * @param isCalendar
 * @returns {Object|null} - Returns the Vue app instance or null
 */
export async function mountComponent(id, component, holder, entityIs, append,isCalendar=false) {
    // Append the account ID to the component's ID for uniqueness
    console.log(window.APP)
    const accountId = window.APP.constant('account').id;
    const uniqueId = `${id}-${accountId}`;
    // Return if element with given ID already exists
    if (document.getElementById(uniqueId)&&!isCalendar) {
        return true;
    }

    // Check if the function applies to the current entity
    const entities = Array.isArray(entityIs) ? entityIs : [entityIs];
    const currentEntity = window.APP.data.current_entity;

    if (!entities.includes(currentEntity) && entityIs !== 'everywhere') {
        return true;
    }

    console.log(!entities.includes(currentEntity))

    // Get the container element based on the provided holder
    const container = typeof holder === 'string'
        ? document.querySelector(holder)
        : holder;

    console.log(typeof holder)
    console.log(container)
    // Return and log an error if the container is not found
    if (!container) {
        console.error('Container not found');
        return null;
    }

    // Create a template element with the unique ID
    const el = document.createElement('div');
    el.id = uniqueId;

    if (append) {
        container.append(el);
        console.log('pix')
    } else {
        container.prepend(el);
    }
    // Create and mount a Vue app with your widget to the container
    const app = createApp(component);
    app.use(pinia)
    if(isCalendar){
        console.log(123)
        const accountStore=useAccountStore()
        await accountStore.getAccounts()
    }
    app.use(Notifications)
    app.mount(el);
    console.log(app)
    return app;
}