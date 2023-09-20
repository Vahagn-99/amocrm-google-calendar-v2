import './assets/main.css';
import { handleSettings } from "./settings/config"
import { handlePanel } from "./panel/config"
import { handleEvents } from "./bind_actions/config"
import { handleRender } from "./render/config"
import { handleInit } from "./init/config"
import { async } from './helpers/helpers';

window.Host = "https://widgets-api.dicitech.com/api/";

const Widget = {
    init: async (_amocrm, self,$) => await handleInit(self, $),
    render: async (_amocrm,self, $) => {
        await handleRender(self, $)
        return true
    },
    bind_actions: async (_amocrm,self, $) => await handleEvents(self, $),
    settings: async (appElement, self, $) => await handleSettings(appElement, self, $),
    advancedSettings: async (appElement, self, $) => await handlePanel(appElement, self, $),
    destroy: async (self, $) => true,
    onSave: async (self, $) => await async(window.APP),
}
export default Widget;