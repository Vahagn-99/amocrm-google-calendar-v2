import { mountComponent } from "../helpers/mounter";
import Button from "./Button.vue";

export async function handleRender(self, $) {
    const contextMenu = $("#list-top-search__summary");
    console.log(contextMenu)
    await mountComponent('lead-exchange-button', Button, contextMenu, 'leads-pipeline',true);

    return true;
}