import {mountComponent} from "../helpers/mounter";
import Button from "./Button.vue";
import WidgetSide from "./WidgetSide.vue";

export async function handleRender(_amocrm,self, $) {
    if(_amocrm.data.current_entity==="leads"){
        const contextMenu=$('.card-fields__tags-scoring-container');
        contextMenu.addClass('dct-calendar-flex');
        mountComponent('calendar-icon',Button,contextMenu,'leads',true)
    }


    self.render_template({
        body: '',
        caption: {
            class_name: 'dct-calendar-widget-side-cation'
        },
        render: '<div id="dct-widget-side-calendar"></div>'
    });

    if(_amocrm.data.current_entity==="leads"){
        const contextMenu=$('#dct-widget-side-calendar');
        mountComponent('calendar-widget-side',WidgetSide,contextMenu,'leads',false)
    }

    return true;
}