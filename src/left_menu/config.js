import { mountComponent } from "../helpers/mounter";
import Calendar from "../calendar/Calendar.vue";

/**
* Метод срабатывает, когда пользователь переходит на кастомную страницу виджета.
* Мы должны отрендерить страницу в зависимости от состоянии страницы.
*
* @param params - Передается текущее состояние страницы. Формат такой:
* {
*     location: 'widget-page', // текущая локация
*     item_code: 'custom_item_1', // ключ, который был указан в manifest.json
*     subitem_code: 'custom_sub_item_3' // ключ подпункта, который был указан в manifest.json
* }
*/
export async function handleLeftMenu(_amocrm, params, self, $) {
    if (params.location === 'widget_page') {
        const contextMenu = $('#work-area-dct_telegram_chat');
        $('#work-area-dct_telegram_chat').addClass('bg-white')
        mountComponent('calendar-main', Calendar, contextMenu, 'widget-page', true)
    }
}