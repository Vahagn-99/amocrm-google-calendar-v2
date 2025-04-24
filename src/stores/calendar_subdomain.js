import {ref} from 'vue';
import {defineStore} from 'pinia';
import apiClient from '../../apiClient';
import {useAmoStore} from "./amocrm";

export const useCalendarSubdomainStore = defineStore('calendar_subdomain', () => {
    const amoStore = useAmoStore();
    const {user,account} = useAmoStore();

    const client = ref({});
    const isLicensed = ref(false);
    const isRegistred = ref(false);
    const hasPhone = ref(false);
    const subscription=ref(null);
    const phone=ref(null);

    const addPhone = async ({phone}) => {
        await apiClient.post(`clients/phone`, {
            phone: phone,
            country:'ru'
        });
        await getClientInfo();
    }

    const getClientInfo = async () => {
        const account = amoStore.account
        const response = await apiClient.get(`clients/info`);
        client.value = response.data.client;
        isLicensed.value=client.value?.last_subscription?.status
        isRegistred.value=response.data?.amo_access_token_status
        hasPhone.value=!!client.value?.phone
        phone.value=client.value?.phone
        subscription.value=client.value?.last_subscription?.subscription_plan?.features
    }


    return {
        isLicensed,
        isRegistred,
        hasPhone,
        subscription,
        getClientInfo,
        addPhone,
        phone,
        client
    };
})