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

    //acctions
    const getAccounts = async () => {
        await subdomainStore.asyncSubdomain();
        const resposne = await apiClient.get(`calendar/v1/${subdomainStore.subdomainId}/accounts`);
        accounts.value = resposne.data.data
        console.log(accounts.value)
    }

    const saveAccount = async (account) => {
        try {
            await apiClient.post(`calendar/v2/accounts/${account.id}`, { name: account.name });
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
            await apiClient.delete(`calendar/v1/${subdomainStore.subdomainId}/accounts/${accountId}`);
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