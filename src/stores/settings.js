import {ref} from 'vue';
import {notify} from "@kyvg/vue3-notification";
import {defineStore} from 'pinia';
import apiClient from '../../apiClient';
import {useSubdomainStore} from './subdomain';
import {useSelectStore} from "./select";

export const useSettingsStore = defineStore('settings', () => {
    //store
    const subdomainStore = useSubdomainStore();

    // state
    const settings = ref([]);

    // actions
    const getSettings = (body) => {
        settings.value=body
        if(settings.value.event_name_id===999999||!settings.value.event_name_id){
            settings.value.event_name_id=0
        }
        if(!settings.value.event_location_id){
            settings.value.event_location_id=777699
        }
        if(!settings.value.starts_at_id){
            settings.value.starts_at_id=777695
        }
        if(!settings.value.ends_at_id){
            settings.value.ends_at_id=777697
        }

    }

    const selectStore=useSelectStore()

    const saveSettings = async (accountId) => {

        settings.value.delete_status_ids = settings.value.delete_status_ids.filter(id => !!id );
        if(settings.value.duration){
            settings.value.ends_at_id=null
        }
        settings.value.template=selectStore.replaceViewWithId(settings.value.template)
        await apiClient.post(`instances/${accountId}/settings`,settings.value)
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