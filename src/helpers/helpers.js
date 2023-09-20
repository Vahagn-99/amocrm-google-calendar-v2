import apiClient from "../../apiClient";

export function oauthModal(url) {
    return new Promise((resolve, reject) => {
        const win = window.open(url, '_blank', 'width=800,height=600')
        window.addEventListener('message', function (event) {
            if (event.origin !== "https://widgets-api.dicitech.com")
                return;
            if (event.data === "closed") {
                resolve();
            }
        }, false);
    })
}

export function goTo(href, data = []) {
    window.location.href = href;
}

export async function async(amocrm) {
    const account = amocrm.constant('account')
    const user = amocrm.constant('user')
    const usersDataV2 = await $.get('/api/v2/account?with=users');
    const usersDataV4 = await $.get('/api/v4/users');

    const handledV2 = Object.values(usersDataV2._embedded.users);
    const handledV4 = usersDataV4._embedded.users.map(user => {
        return {
            id: user.id
            , email: user.email
            , is_admin: user.rights.is_admin
            , is_free: user.rights.is_free
            , is_active: user.rights.is_active
        };
    });
    const users = handledV2.map(user => {
        const find = handledV4.find(item => item.id === user.id);
        return {
            id: user.id
            , name: user.name
            , phone: user.phone_number
            , email: find['email']
            , is_admin: find['is_admin']
            , is_free: find['is_free']
            , is_active: find['is_active']
        }
    })

    const data = {
        name: user.name,
        phone: user.personal_mobile,
        email: user.login,
        amocrm_id: account.id,
        subdomain: account.subdomain,
        country: account.country,
        currency: account.currency,
        paid_from: account.paid_from,
        paid_till: account.paid_till,
        pay_type: account.pay_type,
        tariff: account.tariffName,
    }
    data.users = users;
    try {
        const { data: { data: { id: subdomainId } } } = await apiClient.post(`subdomains`, data, { byWidgetId: true });
        return subdomainId;
    } catch (error) {
        return;
    }
}