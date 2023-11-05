import { UrlApi } from "../../constants";

const handleLink = (endpoint) => {
    return `${UrlApi}${endpoint}`;
    // return `https://api.hub.konect.id${endpoint}`;
}

export default handleLink;