import { onMounted, ref } from 'vue';
import { notify } from "@kyvg/vue3-notification";
import { defineStore } from 'pinia';
import apiClient from '../../apiClient';
import { useSubdomainStore } from './subdomain';

export const useSettingsStore = defineStore('settings', () => {
    //store
    const subdomainStore = useSubdomainStore();

    // state
    const settings = ref([]);

    // actions
    const getSettings = async (googleAccountId) => {
        try {
            const response = await apiClient.get(`calendar/v1/account/${googleAccountId}/settings`);
            settings.value = response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    const saveSettings = async () => {
        try {
            const { settings, accountId } = data;
            const response = await apiClient.post(`calendar/v1/account/${accountId}/settings`, {
                id: settings.id,
                date_district: settings.date_district,
                services_parent_id: settings.services_parent_id,
                end_date_id: settings.end_date_id,
                event_name_id: settings.event_name_id,
                event_address_id: settings.event_address_id,
                event_body: settings.event_body,
                start_date_id: settings.start_date_id,
                status_id: settings.status_id,
                pipeline_id: settings.pipeline_id,
                google_account_id: accountId,
                services: settings.services
            });
            settings.value = response.data.data;
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

    const destorySettings = async (accountId, settingsId) => {
        try {
            await apiClient.delete(`calendar/v1/account/${accountId}/settings/${settingsId}`);
            notify({
                type: 'success',
                title: "Пользователь #" + subdomainStore.subdomainId,
                text: "Что-то пошло не так! Повтарите действе или сообшите нам",
            });
        } catch (error) {
            notify({
                type: 'error',
                title: "Пользователь #" + subdomainStore.subdomainId,
                text: "Что-то пошло не так! Повтарите действе или сообшите нам",
            });
        }
    }


    return {
        settings,
        getSettings,
        saveSettings,
        destorySettings,
    };
})