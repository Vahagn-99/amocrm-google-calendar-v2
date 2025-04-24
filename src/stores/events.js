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
        const response = await apiClient.get(`instances/${account_id}/events`);



        events.value =  response.data.data.map(event => {

            return {
                id: event.data.google_event_id,
                calendar_id: event.data.google_calendar_id,
                title: event.data.summary,
                description: event.description,
                location: event.data.location,
                end: event.data.end.dateTime,
                start: event.data.start.dateTime,
            }
        })
    }

    const getLeadUrl = async (account_id,event_id) => {
        const response = await apiClient.get(`instances/${account_id}/events/${event_id}/lead`);
        currentEvent.value.url=response.data.link
    }

    const getColors = async (account_id) => {
        const response = await apiClient.get(`instances/${account_id}/calendars/colors`);
        colors.value = response.data.data
    }


    return {
        events,
        colors,
        getEvents,
        getColors,
        currentEvent,
        getLeadUrl
    };
})