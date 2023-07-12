import { LOCAL_CURRENT_ORG } from "./constant";

export const currentOrg = () => {
    try {
        const res = JSON.parse(localStorage.getItem(LOCAL_CURRENT_ORG) || '');
        return res
    } catch {
        return undefined;
    }
}