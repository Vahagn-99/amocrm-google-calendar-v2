import {onMounted, ref} from 'vue';
import { defineStore } from 'pinia';
import apiClient from '../../apiClient';
import { useSubdomainStore } from './subdomain';

export const useEventsStore = defineStore('events', () => {
    //stores
    const subdomainStore = useSubdomainStore();
    //state
    const events = ref([]);

    const getEvents = async () => {
        const resposne = await apiClient.get(`calendar/v2/accounts/224/events`);
        console.log(resposne.data.data)
        events.value = resposne.data.data
    }

    onMounted(async () => {
        await getEvents()
    })

    return {
        getEvents,
        events
    };
})