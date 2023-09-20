import { defineStore } from 'pinia';

export const useAmoStore = defineStore('amocrm', () => {
    //stores
    const amocrm = window.APP;
   
    //state
    const currentEntity = amocrm.data.current_entity;
    const currentCard = amocrm.data.current_card;
    const user = amocrm.constant('user');
    const account = amocrm.constant('account');

    return {
        currentEntity,
        currentCard,
        user,
        account
    };
})