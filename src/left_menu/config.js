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
export async function handleLeftMenu(params) {
    alert(1);
    console.log(params);
    console.log('barev');
    return true;
}