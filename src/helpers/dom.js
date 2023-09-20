export function createDomElement(tag, ...classes) {
    const created = document.createElement(tag)
    // ✅ Add multiple classes
    created.classList.add(...classes);
    return created;
}

export function deleteDomElement(element) {
    element = typeof element === 'string'
        ? document.querySelector(element)
        : element;
    // ✅ Remove element
    element.remove();
}

export function deleteClasses(element, ...classes) {
    element = typeof element === 'string'
        ? document.querySelector(element)
        : element;
    // ✅ Remove multiple classes
    element.classList.remove(...classes);
}
