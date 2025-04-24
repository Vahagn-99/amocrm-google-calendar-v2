import {onMounted, ref} from 'vue';
import { defineStore } from 'pinia';
import apiClient from '../../apiClient';
import { useSubdomainStore } from './subdomain';
import {notify} from "@kyvg/vue3-notification";

export const useLeadStore = defineStore('leads', () => {

    const lead = ref({});
    const element=ref({
        "account": {},
        "leads": {
            "manual_update": []
        }
    })
    const getLead = async (id) => {
        const response = await $.get(`/api/v4/leads/${id}`);
        lead.value = response
        const account=window.AMOCRM.constant('account')
        element.value.account={
            "subdomain": account.subdomain,
            "id": account.id,
            "_links": {
                "self": `https://${account.subdomain}.amocrm.ru`
            }
        }
        element.value.leads.manual_update=[{
            "id": lead.value.id,
            "name": lead.value.name,
            "status_id": lead.value.status_id,
            "price": lead.value.price,
            "responsible_user_id": lead.value.responsible_user_id,
            "last_modified": lead.value.updated_at,
            "modified_user_id": lead.value.updated_by,
            "created_at": lead.value.updated_at,
            "updated_at": lead.value.updated_by,
            "created_user_id": lead.value.created_by,
            "date_create": lead.value.created_at,
            "pipeline_id": lead.value.pipeline_id,
            "account_id": account.id,
            "custom_fields": transformCustomFields(lead.value.custom_fields_values)
        }]
    }

    const sendLead = async (id) => {
        await getLead(id)
        try {
            await apiClient.post(`clients/webhook`,element.value);
            notify({
                type: 'success',
                title: "Сделка #" + id,
                text: "Успешно обновлена",
            });
        } catch (error) {
            notify({
                type: 'error',
                title: "Сделка #" + id,
                text: "Что-то пошло не так! Повтарите действе",
            });
        }
    }
    function transformCustomFields(customFieldsValues) {
        return customFieldsValues.map(field => ({
            id: String(field.field_id),
            name: field.field_name,
            values: field.values.map(value =>
                value.enum_id !== undefined
                    ? { value: value.value, enum: String(value.enum_id) }
                    : {value: value.value}
            )
        }));
    }



    return {
        lead,
        sendLead
    };
})