import {onMounted, ref} from 'vue';
import {notify} from "@kyvg/vue3-notification";
import {defineStore} from 'pinia';
import apiClient from '../../apiClient';
import {useSubdomainStore} from './subdomain';
import {data} from "autoprefixer";

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
            if (settings.value.date_district) {
                let array = settings.value.date_district.split(',')
                settings.value.date_district_start = extractFirstNumber(array[0]);
                settings.value.date_district_end = extractFirstNumber(array[1]);
            } else {
                settings.value.date_district_start = '';
                settings.value.date_district_end = '';
            }

            console.log(settings.value.date_district, settings.value.date_district_start, settings.value.date_district_end)
        } catch (error) {
            console.log(error);
        }
    }

    function extractFirstNumber(inputString) {
        // Use a regular expression to find the first sequence of digits
        const match = inputString.match(/\d+/);

        // If a match is found, convert it to a number and return it; otherwise, return NaN
        return match ? Number(match[0]) : NaN;
    }

    function getTime(start, end) {
        return start + ' , ' + end;
    }

    const saveSettings = async (accountId) => {
        console.log(settings.value.date_district_start && settings.value.date_district_end)

        const response = await apiClient.post(`calendar/v1/account/${accountId}/settings`, {

            id: settings.value.id,
            date_district: settings.value.date_district_start && settings.value.date_district_end ? getTime(settings.value.date_district_start, settings.value.date_district_end) : null,
            services_parent_id: settings.value.services_parent_id,
            end_date_id: settings.value.end_date_id,
            event_name_id: settings.value.event_name_id,
            event_address_id: settings.value.event_address_id,
            event_body: settings.value.event_body,
            start_date_id: settings.value.start_date_id,
            status_id: settings.value.status_id,
            pipeline_id: settings.value.pipeline_id,
            google_account_id: accountId,
            services: settings.value.services
        });
    }

    const deleteSettings = async (accountId, settingsId) => {
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
        deleteSettings,
    };
})