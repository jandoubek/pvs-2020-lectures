import {useLocation} from "react-router-dom";

/** Use: const queryRoute = useQuery(); queryRoute.get('param'); */
export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};