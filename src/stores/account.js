import { onMounted, ref } from 'vue';
import { defineStore } from 'pinia';
import apiClient from '../../apiClient';
import { useSubdomainStore } from './subdomain';
import { notify } from "@kyvg/vue3-notification";

export const useAccountStore = defineStore('account', () => {

    //stores
    const subdomainStore = useSubdomainStore();

    //state
    const accounts = ref([]);

    const getAccounts = async () => {
        const response = await apiClient.get(`/instances`);
        accounts.value = response.data
    }

    const saveAccount = async (account) => {
        try {
            await apiClient.post(`/instances/${account.id}`, { name: account.name });
            notify({
                type: 'success',
                title: "Пользователь #" + account.id,
                text: "Настройки успешно сохранены",
            });
        } catch (error) {
            notify({
                type: 'error',
                title: "Пользователь #" + account.id,
                text: "Что-то пошло не так! Повтарите действе",
            });
        }
    }

    const destroyAccount = async (accountId) => {
        try {
            await apiClient.delete(`instances/${accountId}`);
            await getAccounts()
            notify({
                type: 'success',
                title: "Пользователь #" + accountId,
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
        getAccounts,
        saveAccount,
        destroyAccount,
        accounts
    };
})