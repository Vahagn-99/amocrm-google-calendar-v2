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

    const loader = ref(false)
    const getCalendars = async (account_id) => {
        const resposne = await apiClient.get(`calendar/v2/accounts/${account_id}/calendars`);
        calendars.value = resposne.data.data
    }

    const saveCalendar = async (account_id) => {
        try {
            const resposne = await apiClient.post(`calendar/v2/accounts/${account_id}/calendars`, {calendars: calendars.value});
            let id = resposne.data.data.id
            const interval = setInterval(async () => {
                const progress = await axios.get(window.url + `api/batches/${id}`);
                if (progress.data.data.progress === 100) {
                    clearInterval(interval)
                    await getCalendars(account_id)
                    loader.value = false;
                    notify({
                        type: 'success',
                        title: "Пользователь #" + account_id,
                        text: "Настройки успешно сохранены",
                    });
                }
            }, 2000)
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
            await apiClient.delete(`calendar/v2/accounts/${account_id}/calendars/${calendar_id}`);
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