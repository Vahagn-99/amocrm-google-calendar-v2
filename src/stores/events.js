import {onMounted, ref} from 'vue';
import { defineStore } from 'pinia';
import apiClient from '../../apiClient';
import { useSubdomainStore } from './subdomain';

export const useEventsStore = defineStore('events', () => {
    //stores
    const subdomainStore = useSubdomainStore();
    //state
    const events = ref([]);
    const colors=ref([]);
    const currentEvent=ref({
        title:'',
        start:'',
        end:'',
        description:'',
        calendar:'',
        url:''
    });
    const getEvents = async (account_id) => {
        const resposne = await apiClient.get(`calendar/v2/accounts/${account_id}/events`);
        events.value = resposne.data.data
    }

    const getEventUrl = async (account_id,event_id) => {
        const resposne = await apiClient.get(`calendar/v2/accounts/${account_id}/events/${event_id}/lead`);
        currentEvent.value.url=resposne.data.link
    }

    const getColors = async (account_id) => {
        const resposne = await apiClient.get(`calendar/v2/accounts/${account_id}/calendars/colors`);
        colors.value = resposne.data.data
    }


    return {
        events,
        colors,
        getEvents,
        getColors,
        currentEvent,
        getEventUrl
    };
})