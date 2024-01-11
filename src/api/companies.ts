import { Company} from "~/types";
import { apiInstance } from "./instance";

export const getCompanies = () => {
  return apiInstance.get<Company[]>("/companies");
};
