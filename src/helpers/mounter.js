import { createApp } from "vue";
import pinia from "../stores/pinia";
import Notifications from '@kyvg/vue3-notification'

/**
 * Asynchronously mounts a Vue component.
 * @param {string} id - Unique identifier for the component
 * @param {Object} mountable - Vue component to mount
 * @param {string|HTMLElement} holder - DOM selector or HTMLElement to attach component to
 * @param {string|string[]} entityIs - Entity types that this function applies to
 * @param {Function} callback - Function to be called before mounting
 * @returns {Object|null} - Returns the Vue app instance or null
 */
export async function mountComponent(id, component, holder, entityIs, append) {
    // Append the account ID to the component's ID for uniqueness
    const accountId = window.APP.constant('account').id;
    const uniqueId = `${id}-${accountId}`;
    console.log(uniqueId)
    // Return if element with given ID already exists
    if (document.getElementById(uniqueId)) {
        return true;
    }

    // Check if the function applies to the current entity
    const entities = Array.isArray(entityIs) ? entityIs : [entityIs];
    const currentEntity = window.APP.data.current_entity;

    if (!entities.includes(currentEntity) && entityIs !== 'everywhere') {
        return true;
    }

    // Get the container element based on the provided holder
    const container = typeof holder === 'string'
        ? document.querySelector(holder)
        : holder;

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
    } else {
        container.prepend(el);
    }
    // Create and mount a Vue app with your widget to the container
    const app = createApp(component);
    app.use(pinia)
    app.use(Notifications)
    app.mount(el);
    console.log(app)
    return app;
}