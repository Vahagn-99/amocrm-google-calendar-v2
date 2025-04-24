export const defaultMarkers = {
    leads: [
        { id: "{{lead.name}}", markup: "{{lead.name}}", name: "Название сделки", type: "text", view: "[[ Сделки : Название сделки ]]" },
        { id: "{{lead.price}}", markup: "{{lead.price}}", name: "Бюджет", type: "text", view: "[[ Сделки : Бюджет ]]" },
        { id: "{{contact.name}}", markup: "{{contact.name}}", name: "Имя контакта", type: "text", view: "[[ Контакт : Имя контакта ]]" },
        { id: "{{company.name}}", markup: "{{company.name}}", name: "Название компании", type: "text", view: "[[ Компания : Название компании ]]" },
        { id: "{{lead.status}}", markup: "{{lead.status}}", name: "Статус", type: "text", view: "[[ Сделки : Статус ]]" },
        { id: "{{lead.responsible}}", markup: "{{lead.responsible}}", name: "Ответственный", type: "text", view: "[[ Сделки : Ответственный ]]" },
        { id: "{{lead.responsible_id}}", markup: "{{lead.responsible_id}}", name: "Ответственный (ID)", type: "text", view: "[[ Сделки : Ответственный (ID) ]]" },
        { id: "{{lead.responsible_email}}", markup: "{{lead.responsible_email}}", name: "Ответственный (Email)", type: "text", view: "[[ Сделки : Ответственный (Email) ]]" }
    ],
    contacts: [
        { id: "{{contact.id}}", markup: "{{contact.id}}", name: "ID", type: "text", view: "[[ Контакты : ID ]]" },
        { id: "{{contact.name}}", markup: "{{contact.name}}", name: "Имя", type: "text", view: "[[ Контакты : Имя ]]" },
        { id: "{{contact.last_name}}", markup: "{{contact.last_name}}", name: "Фамилия", type: "text", view: "[[ Контакты : Фамилия ]]" },
        { id: "{{contact.responsible}}", markup: "{{contact.responsible}}", name: "Ответственный", type: "text", view: "[[ Контакты : Ответственный ]]" },
        { id: "{{contact.responsible_id}}", markup: "{{contact.responsible_id}}", name: "Ответственный (ID)", type: "text", view: "[[ Контакты : Ответственный (ID) ]]" },
        { id: "{{contact.responsible_email}}", markup: "{{contact.responsible_email}}", name: "Ответственный (Email)", type: "text", view: "[[ Контакты : Ответственный (Email) ]]" }
    ],
    companies: [
        { id: "{{company.id}}", markup: "{{company.id}}", name: "ID", type: "text", view: "[[ Компании : ID ]]" },
        { id: "{{company.responsible}}", markup: "{{company.responsible}}", name: "Ответственный", type: "text", view: "[[ Компании : Ответственный ]]" },
        { id: "{{company.responsible_id}}", markup: "{{company.responsible_id}}", name: "Ответственный (ID)", type: "text", view: "[[ Компании : Ответственный (ID) ]]" },
        { id: "{{company.responsible_email}}", markup: "{{company.responsible_email}}", name: "Ответственный (Email)", type: "text", view: "[[ Компании : Ответственный (Email) ]]" }
    ]
};