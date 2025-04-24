export const buildMappings=() =>{
    const result = {};
    Object.values(markers.value).flat().forEach(item => {
        if (item.view) result[item.view] = item.id;
    });
    return result;
}

export const replaceViewWithId=(text, mappingsObj)=>{
    const mappings = buildMappings(mappingsObj);
    return text.replace(/\[\[.*?\]\]/g, match => mappings[match] || match);
}