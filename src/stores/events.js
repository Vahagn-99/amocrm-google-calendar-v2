
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
console.log(todayStr)

export const INITIAL_EVENTS = [
    {
        id: createEventId(),
        title: 'Вам нужно позвонить.',
        start: '2023-09-18',
    },
    {
        id: createEventId(),
        title: 'Вам нужно позвонить.',
        start: '2023-09-20',
    },
    {
        id: createEventId(),
        title: 'Вам нужно позвонить.',
        start: '2023-09-21',
    }
]

export function createEventId() {
    return String(eventGuid++)
}
