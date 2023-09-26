import {mountComponent} from "../helpers/mounter";
import Button from "./Button.vue";

export async function handleRender(_amocrm,self, $) {
    if(_amocrm.data.current_entity==="leads"){
        const contextMenu=$('.card-fields__tags-scoring-container');
        contextMenu.addClass('dct-calendar-flex');
        mountComponent('calendar-icon',Button,contextMenu,'leads',true)
    }
    return true;
}