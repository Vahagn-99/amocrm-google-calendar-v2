import { ref } from 'vue';
import { defineStore } from 'pinia';
import apiClient from '../../apiClient';
import { useSubdomainStore } from './subdomain';

export const useSelectStore = defineStore('select', () => {
    //stores
    const subdomainStore = useSubdomainStore();

    //state
    const calendars = ref([]);
    const fields = ref([]);
    const statuses = ref([]);
    const selects = ref([]);
    const markers = ref([]);
    const countries = ref([]);

    // actions
    const getCountries = async () => {
        const resposne = await apiClient.get(`/countries`);
        countries.value = resposne.data.data
    };
    const getStatuses = async () => {
        const resposne = await apiClient.get(`subdomains/${subdomainStore.subdomainId}/statuses`, { byWidgetId: true });
        statuses.value = resposne.data.data
    };
    const getCalendars = async (googleAccountId) => {
        const resposne = await apiClient.get(`calendar/v1/account/${googleAccountId}/calendars`);
        calendars.value = resposne.data.data
    };
    const getFields = async ()=> {
        const resposne = await apiClient.get(`subdomains/${subdomainStore.subdomainId}/fields`, { byWidgetId: true });
        fields.value = resposne.data.data
    };
    const getSelects = async () => {
        const resposne = await apiClient.get(`subdomains/${subdomainStore.subdomainId}/selects`, { byWidgetId: true });
        selects.value = resposne.data.data
    };
    const getMarkers = async ()=> {
        const resposne = await apiClient.get(`subdomains/${subdomainStore.subdomainId}/markers`, { byWidgetId: true });
        markers.value = resposne.data.data
    };

    return {
          getCalendars
        , getFields
        , getStatuses
        , getSelects
        , getMarkers
        , getCountries
        , fields
        , markers
        , countries
        , statuses
        , selects
        , calendars
    };
})