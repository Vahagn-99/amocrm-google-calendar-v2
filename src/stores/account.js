import { ref } from 'vue';
import { defineStore } from 'pinia';
import apiClient from '../../apiClient';
import { useSubdomainStore } from './subdomain';

export const useAccountStore = defineStore('account', () => {
    //stores
    const subdomainStore = useSubdomainStore();
    //state
    const accounts = ref([]);

    //acctions
    const getAccounts = async () => {

        const resposne = await apiClient.get(`calendar/v1/${subdomainStore.subdomainId}/accounts`);
        accounts.value = resposne.data.data
    }

    const destroyAccount = async (accountId) => {
        await apiClient.get(`calendar/v1/${subdomainStore.subdomainId}/accounts/${accountId}`);
    }

    return {
        getAccounts,
        destroyAccount,
        accounts
    };
})