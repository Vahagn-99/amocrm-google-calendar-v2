import {onMounted, ref} from 'vue';
import {defineStore} from 'pinia';
import apiClient from '../../apiClient';
import {useSubdomainStore} from './subdomain';
import {notify} from "@kyvg/vue3-notification";
import axios, {get, post} from "axios";

export const useCalendarSettingsStore = defineStore('calendar_settings', () => {
    //stores
    const subdomainStore = useSubdomainStore();
    //state
    const calendars = ref([]);
    const current_calendars = ref([]);
    const loader = ref(false)
    const getCalendars = async (account_id) => {
        const response = await apiClient.get(`instances/${account_id}/calendars`);
        calendars.value = response.data
    }

    const getCurrentCalendars = async (account_id) => {
        const response = await apiClient.get(`instances/${account_id}/calendars`);
        current_calendars.value=response.data
    }

    const saveCalendar = async (account_id) => {
        try {
            await getCurrentCalendars(account_id);
            if(current_calendars.value!==calendars.value){
                await apiClient.post(`instances/${account_id}/calendars`, {calendars: calendars.value});
            }
            notify({
                type: 'success',
                title: "Пользователь #" + account_id,
                text: "Настройки успешно сохранены",
            });
        } catch (error) {
            loader.value = false;
            notify({
                type: 'error',
                title: "Пользователь #" + props.account,
                text: "Заполните все поля или попробуйте авторизоваться еще раз",
            });
        }
    }

    const deleteCalendar = async (account_id, calendar_id) => {
        try {
            await apiClient.delete(`instances/${account_id}/calendars/${calendar_id}`);
            notify({
                type: 'success',
                title: "Пользователь #" + account_id,
                text: "Настройки успешно Удалены",
            });
        } catch (error) {
            notify({
                type: 'error',
                title: "Пользователь #",
                text: "Что-то пошло не так! Повтарите действе",
            });
        }
    }


    return {
        getCalendars,
        saveCalendar,
        deleteCalendar,
        calendars,
        loader
    };
})