import {ref} from 'vue';
import {defineStore} from 'pinia';
import apiClient from '../../apiClient';
import {useSubdomainStore} from './subdomain';

export const useSelectStore = defineStore('select', () => {
    //stores
    const subdomainStore = useSubdomainStore();

    //state
    const countries = ref([]);
    const statuses = ref([]);
    const users = ref([]);

    // actions
    const getCountries = async () => {
        const resposne = await apiClient.get(`/countries`);
        countries.value = resposne.data.data
    };

    const getStatuses = async () => {
        const resposne = await apiClient.get(`subdomains/${subdomainStore.subdomainId}/statuses`, {byWidgetId: true});
        statuses.value = resposne.data.data
    };

    const getUsers = async () => {
        const resposne = await apiClient.get(`subdomains/${subdomainStore.subdomainId}/users`, {byWidgetId: true});
        users.value = resposne.data.data.filter((user) => user.is_active === true)

    };


    return {
        getCountries,
        getStatuses,
        getUsers,
        countries,
        statuses,
        users
    };
})