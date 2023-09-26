import {onMounted, ref} from 'vue';
import { defineStore } from 'pinia';
import apiClient from '../../apiClient';
import { useSubdomainStore } from './subdomain';

export const useCalendarSettingsStore = defineStore('calendar_settings', () => {
    //stores
    const subdomainStore = useSubdomainStore();
    //state
    const calendars = ref([]);

    const getCalendars = async (account_id) => {
        const resposne = await apiClient.get(`calendar/v2/accounts/${account_id}/calendars`);
        console.log(resposne.data.data)
        calendars.value = resposne.data.data
    }

    const saveCalendar = async (account_id, calendar) => {
        const resposne = await apiClient.post(`calendar/v2/accounts/${account_id}/calendars/${calendar.id}`,calendar);
        console.log(resposne.data.data)
        calendars.value = resposne.data.data
    }


    return {
        getCalendars,
        saveCalendar,
        calendars
    };
})