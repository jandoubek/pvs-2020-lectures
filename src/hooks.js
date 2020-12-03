import {useLocation} from "react-router-dom";
import subjects from "./data/predmety.json";

export const useSubjects = () => {
    return subjects;
};

/** Use: const queryRoute = useQuery(); queryRoute.get('param'); */
export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};