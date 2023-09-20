import { onMounted, ref } from 'vue';
import { notify } from "@kyvg/vue3-notification";
import { defineStore } from 'pinia';
import apiClient from '../../apiClient';
import { useSubdomainStore } from './subdomain';

export const useSettingsStore = defineStore('settings', () => {
    const subdomainStore = useSubdomainStore();
    const settingsList = ref([]);
    const settings = ref({
        id: null,
        user_id: null,
        tech_id: null,
        count:null,
        statuses: [],
    });

    const hasSettings = ref(false);

    const getSettings = async (id) => {
        try {
            let response = await apiClient.get(`lead-exchange/v1/${subdomainStore.subdomainId}/settings/${id}`);
            settings.value = response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    const getSettingsList = async () => {
        try {
            let response = await apiClient.get(`lead-exchange/v1/${subdomainStore.subdomainId}/settings`);
            settingsList.value = response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    function $reset() {
        settings.value = {
            id: null,
            user_id: null,
            tech_id: null,
            count:null,
            statuses: [],
        };
    }

    const saveSettings = async () => {
        try {
            await apiClient.post(`lead-exchange/v1/${subdomainStore.subdomainId}/settings`, settings.value);
            await getSettingsList()
            notify({
                type: 'success',
                title: "Пользователь #" + subdomainStore.subdomainId,
                text: "Настройки успешно сохранены",
            });
        } catch (error) {
            notify({
                type: 'error',
                title: "Пользователь #" + subdomainStore.subdomainId,
                text: "Заполните все поля или попробуйте авторизоваться еще раз",
            });
        }
    }

    const destorySettings = async (settingsId) => {
        try {
            await apiClient.delete(`lead-exchange/v1/${subdomainStore.subdomainId}/settings/${settingsId}`);
            await getSettingsList();
            notify({
                type: 'success',
                title: "Пользователь #" + subdomainStore.subdomainId,
                text: "Настройки успешно Удалены",
            });
        } catch (error) {
            notify({
                type: 'error',
                title: "Пользователь #" + subdomainStore.subdomainId,
                text: "Что-то пошло не так! Повтарите действе или заново авторизуйтесь",
            });
        }
    }


    onMounted(async () => {
        await getSettingsList()
    })


    return {
        settings,
        settingsList,
        getSettings,
        hasSettings,
        saveSettings,
        destorySettings,
        getSettingsList,
        $reset
    };
})