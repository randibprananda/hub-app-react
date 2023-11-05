import { UrlApi } from "../../constants";

const imageHandle = (endpoint) => {
    return `${UrlApi}${endpoint}`;
    // return `https://api.hub.konect.id${endpoint}`;
}

export default imageHandle;