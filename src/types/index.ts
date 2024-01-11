export type Job = {
  id?: number;
  title: string;
  description: string;
  category: string;
  company: string;
  salary: number;
  location: string;
};

export type Company = {
  companyName: string;
};

export type Category = {
  categoryName: string;
};

export type JobsSort = "ASC" | "DESC";

export type JobsSortField = "company" | "salary" | "title";


export type ValueNamePair<T> = {
  value: T;
  name: string;
};

export type JobsSortFieldText = 
  | { value: "company"; name: "Компания" }
  | { value: "salary"; name: "Зарплата" }
  | { value: "title"; name: "Название" };

export type JobsRequestParams = {
  number: number;
  size: number;
  companyNames?: string[];
  categoryNames?: string[];
  locations?: string ;
  minSalary?: number | "" ;
  maxSalary?: number | "";
  sortBy?: JobsSortField;
  sortDirection?: JobsSort;
};

export type Page<T> = {
  content: T;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: true;
    unpaged: false;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};
