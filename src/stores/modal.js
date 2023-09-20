import {onMounted, ref} from 'vue';
import { defineStore } from 'pinia';
import apiClient from '../../apiClient';
import { useSubdomainStore } from './subdomain';
import {useSettingsStore} from "./settings";
import {useAmoStore} from "./amocrm";
import settingsStore from "../main";

export const useModalStore = defineStore('modal', () => {
    //stores
    const settingsStore = useSettingsStore();

    const subdomainStore = useSubdomainStore();
    const leads = ref([]);
    const currentLeads = ref([]);


    const amoStore = useAmoStore();
    const user = amoStore.user;

    const getLeads = async (user_id) => {
        const resposne = await apiClient.get(`lead-exchange/v1/${subdomainStore.subdomainId}/leads/${user_id}`);
        let statusIds=[142,143];
        leads.value = resposne.data.data.filter((cf) => !statusIds.includes(cf.status_id));
    };

    const getCurrentLeads = async (user_id) => {
        console.log(user_id)
        await settingsStore.getSettings(user.id)
        const resposne = await apiClient.get(`lead-exchange/v1/${subdomainStore.subdomainId}/leads/${user_id}`);
        const statusIds = settingsStore.settings.statuses.map(statusObj => statusObj.id);
        currentLeads.value = resposne.data.data.filter((cf) => statusIds.includes(cf.status_id));
    };

    const changeResponsibleUser=async (lead_id)=>{
        try {
            await apiClient.post(`lead-exchange/v1/${subdomainStore.subdomainId}/exchange/${user.id}`, {'lead_id': lead_id});
        }catch (error){
            console.log(error)
        }
    }

    return {
        getCurrentLeads,
        changeResponsibleUser,
        getLeads,
        leads,
        currentLeads
    };
})
