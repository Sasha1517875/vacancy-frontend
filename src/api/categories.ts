import { Category} from "~/types";
import { apiInstance } from "./instance";

export const getCategories = () => {
  return apiInstance.get<Category[]>("/categories");
};
