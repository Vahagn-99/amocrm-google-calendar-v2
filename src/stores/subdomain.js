import {onMounted, ref} from 'vue';
import {defineStore} from 'pinia';
import apiClient from '../../apiClient';
import {useAmoStore} from "./amocrm";

export const useSubdomainStore = defineStore('subdomain', () => {
    const amoStore = useAmoStore();

    //state
    const subdomainId = ref(localStorage.getItem('subdomain_id'));
    const subdomain = ref({});
    const isLicensed = ref(false);
    const isRegistred = ref(false);
    const hasPhone = ref(false);

    const checkIsRegistred = async () => {
        const response = await apiClient.get(`subdomains/${subdomainId.value}/status`, {byWidgetId: true});
        isRegistred.value = response.data.data.status
    };

    const checkIsLicensed = async () => {
        const response = await apiClient.get(`subdomains/${subdomainId.value}/license`, {byWidgetId: true});
        const {status} = response.data.data
        isLicensed.value = status;
    };

    const asyncSubdomain = async () => {
        const account = amoStore.account
        const response = await apiClient.get(`subdomains/${account.subdomain}/async`, {byWidgetId: true});
        subdomain.value = response.data.data;
        subdomainId.value = subdomain.value.id
        localStorage.setItem('subdomain_id', subdomainId.value);
    }


    const addPhone = async ({phone, country, mask}) => {
        await apiClient.post(`clients/phone`, {
            phone: phone,
            country: country,
            mask: mask
        }, {byWidgetId: true});
        await checkHasPhone();
    }

    const checkHasPhone = async () => {
        const response = await apiClient.get(`subdomains/${subdomainId.value}/phone`, {byWidgetId: true});
        const {status} = response.data.data
        hasPhone.value = status;
    };



    return {
        asyncSubdomain,
        checkIsRegistred,
        checkIsLicensed,
        subdomainId,
        isRegistred,
        isLicensed,
        checkHasPhone,
        addPhone,
        subdomain,
        hasPhone,
    };
})