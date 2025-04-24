import {ref} from 'vue';
import {defineStore} from 'pinia';
import apiClient from '../../apiClient';
import {useSubdomainStore} from './subdomain';
import {defaultMarkers} from "../helpers/const";

export const useSelectStore = defineStore('select', () => {
    //stores
    const subdomainStore = useSubdomainStore();

    //state
    const calendars = ref([]);
    const fields = ref([]);
    const statuses = ref([]);
    const selects = ref([]);
    const markers = ref({});
    const countries = ref([]);
    const tabs=ref({
        leads:'Сделки',
        contacts:'Контакты',
        companies:'Компании',
    })
    // actions
    const idToView=ref({})
    const viewToId=ref({})

    function buildMappings() {
        const result = {};
        const build = {};
        Object.values(markers.value).flat().forEach(item => {
            if (item.view) result[item.view] = item.id;
            if (item.view) build[item.id] = item.view;
        });
        viewToId.value= result;
        idToView.value= build;
    }

    function replaceViewWithId(text){
        return text?.replace(/\[\[.*?\]\]/g, match => viewToId.value[match] || match);
    }

    const getStatuses = async () => {
        const response = await $.get(`/api/v4/leads/pipelines?limit=250`)
        let pipelines = response['_embedded']['pipelines'];
        for (const pipeline of pipelines) {
            statuses.value = pipelines.map(item => ({
                ...item,
                options: item._embedded?.statuses.map(({ id, name }) => ({ id, name })) || []
            }));
        }
    };
    const getCalendars = async (googleAccountId) => {
        const response = await apiClient.get(`instances/${googleAccountId}/calendars`);
        calendars.value = response.data
    };
    const getFields = async () => {
        const entities = ['leads', 'companies', 'contacts'];
        markers.value = defaultMarkers;
        let all_fields = [{ id: 0, name: "Название сделки", code: "custom_lead_name" }];

        try {
            let mergedFields = new Map(all_fields.map(item => [item.id, item]));

            // Make three parallel requests
            const safeGet = async (url) => {
                try {
                    return await $.get(url);
                } catch (err) {
                    return null;
                }
            };

            const hasMore = (res) => res?._embedded?.custom_fields?.length >= 250;

// Page 1
            const leadsPage1 = await safeGet(`/api/v4/leads/custom_fields?limit=250`);
            const companiesPage1 = await safeGet(`/api/v4/companies/custom_fields?limit=250`);
            const contactsPage1 = await safeGet(`/api/v4/contacts/custom_fields?limit=250`);

// Page 2
            const leadsPage2 = hasMore(leadsPage1) ? await safeGet(`/api/v4/leads/custom_fields?page=2&limit=250`) : null;
            const companiesPage2 = hasMore(companiesPage1) ? await safeGet(`/api/v4/companies/custom_fields?page=2&limit=250`) : null;
            const contactsPage2 = hasMore(contactsPage1) ? await safeGet(`/api/v4/contacts/custom_fields?page=2&limit=250`) : null;

// Page 3
            const leadsPage3 = hasMore(leadsPage2) ? await safeGet(`/api/v4/leads/custom_fields?page=3&limit=250`) : null;
            const companiesPage3 = hasMore(companiesPage2) ? await safeGet(`/api/v4/companies/custom_fields?page=3&limit=250`) : null;
            const contactsPage3 = hasMore(contactsPage2) ? await safeGet(`/api/v4/contacts/custom_fields?page=3&limit=250`) : null;

// Combine
            const leadsRes = [
                ...(leadsPage1?._embedded?.custom_fields ?? []),
                ...(leadsPage2?._embedded?.custom_fields ?? []),
                ...(leadsPage3?._embedded?.custom_fields ?? [])
            ];

            const companiesRes = [
                ...(companiesPage1?._embedded?.custom_fields ?? []),
                ...(companiesPage2?._embedded?.custom_fields ?? []),
                ...(companiesPage3?._embedded?.custom_fields ?? [])
            ];

            const contactsRes = [
                ...(contactsPage1?._embedded?.custom_fields ?? []),
                ...(contactsPage2?._embedded?.custom_fields ?? []),
                ...(contactsPage3?._embedded?.custom_fields ?? [])
            ];


            const responses = { leads: leadsRes, companies: companiesRes, contacts: contactsRes };

            entities.forEach(entity => {
                const items = responses[entity] || [];

                const transformedItems = items.map(item => ({
                    ...item,
                    id: `{{${entity}.cf.${item.id}}}`,
                    markup: `{{${entity}.cf.${item.id}}}`,
                    view: `[[ ${tabs.value[entity]} : ${item.name} ]]`,
                }));

                markers.value[entity].push(...transformedItems);
                items.forEach(item => mergedFields.set(item.id, item));
            });

            all_fields = [...mergedFields.values()];
        } catch (e) {
        }

        fields.value = all_fields;
        getSelects();
    };
    const getSelects =  () => {
        selects.value = fields.value
            .filter(item => Array.isArray(item.enums) && item.enums.length > 0 && item.type === 'select')
            .map(item => ({
                ...item,
                options: item.enums.map(({ id, value }) => ({ id, value }))
            }));
    };


    return {
          getCalendars
        , getFields
        , getStatuses
        , getSelects
        , buildMappings
        , replaceViewWithId
        , viewToId
        , idToView
        , fields
        , markers
        , countries
        , statuses
        , selects
        , calendars
    };
})