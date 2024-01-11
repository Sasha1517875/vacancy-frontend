import React, { useState, useEffect } from "react";
import JobList from "~/components/JobList";
import Pagination from "~/components/Pagination";
import MultiSelect from "~/components/MultiSelect";
import SalaryRangeInput from "~/components/SalaryRangeInput";
import CityInput from "~/components/CityInput";
import { Job, JobsSort, JobsSortField, Page, ValueNamePair } from "~/types";
import { GetServerSideProps } from "next";
import { getJobs } from "~/api/jobs";
import { getCompanies } from "~/api/companies";
import { getCategories } from "~/api/categories";
import { useJobs } from "~/hooks";
import { DropDown } from "~/components/DropDowsn";
import { Spinner } from "@material-tailwind/react";

type JobListPageProps = {
  jobsPage: Page<Job[]>;
  companies: string[];
  categories: string[];
};


const JobListPage = ({
  jobsPage: initialPage,
  companies,
  categories,
}: JobListPageProps) => {
  const { jobsPage, isLoading, refetch } = useJobs(initialPage);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [page, setPage] = useState(jobsPage.number);
  const [city, setCity] = useState("");
  const [minSalary, setMinSalary] = useState<number | "">("");
  const [maxSalary, setMaxSalary] = useState<number | "">("");
  const [sortDirection, setSortDirection] = useState<ValueNamePair<JobsSort>>({
    value: "ASC",
    name: "По возрастанию",
  });
  const [sortField, setSortField] = useState<ValueNamePair<JobsSortField>>({
    value: "title",
    name: "Название",
  });

  const createRequest = (currentPage: number = page) => {
    return {
      number: currentPage,
      size: 9,
      companyNames: selectedCompanies,
      categoryNames: selectedCategories,
      locations: city != "" ? city : undefined,
      minSalary: minSalary != "" ? minSalary : undefined,
      maxSalary: maxSalary != "" ? maxSalary : undefined,
      sortBy: sortField.value,
      sortDirection: sortDirection.value,
    };
  };

  const handleSearchButtonClick = () => {
    refetch(createRequest());
  };

  const handlePageChange = (newPageNumber: number) => {
    setPage(newPageNumber - 1);
    refetch(createRequest(newPageNumber - 1));
  };

  return (
    <div className="container mx-auto flex flex-col items-center p-4">
      <MultiSelect
        label="Компании"
        options={companies}
        selected={selectedCompanies}
        onChange={setSelectedCompanies}
      />
      <MultiSelect
        label="Категории"
        options={categories}
        selected={selectedCategories}
        onChange={setSelectedCategories}
      />
      <div className="flex w-full items-center  justify-between gap-2">
        <CityInput onCityChange={setCity} city={city} />
        <SalaryRangeInput
          min={minSalary}
          max={maxSalary}
          onMinChange={setMinSalary}
          onMaxChange={setMaxSalary}
        />
        <DropDown
          options={[
            { value: "company", name: "Компания" },
            { value: "salary", name: "Зарплата" },
            { value: "title", name: "Название" },
          ]}
          value={sortField}
          onChange={setSortField}
        />
        <DropDown
          options={[
            { value: "ASC", name: "По возрастанию" },
            { value: "DESC", name: "По убыванию" },
          ]}
          value={sortDirection}
          onChange={setSortDirection}
        />
        <button
          onClick={handleSearchButtonClick}
          className="rounded bg-gray-700 px-4 py-2 font-bold text-cyan-50 text-lg hover:bg-gray-600"
        >
          Найти
        </button>
      </div>
      {isLoading ? (
        <Spinner className="h-24 w-24" />
      ) : (
        <>
          <JobList jobs={jobsPage.content} />
          <Pagination
            currentPage={Math.min(jobsPage.number + 1, jobsPage.totalPages)}
            totalPages={jobsPage.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default JobListPage;

export const getServerSideProps: GetServerSideProps<
  JobListPageProps
> = async () => {
  const jobsResponse = getJobs({ number: 0, size: 9 });
  const companiesResponse = getCompanies();
  const categoriesResponse = getCategories();

  return {
    props: {
      jobsPage: (await jobsResponse).data,
      categories: (await categoriesResponse).data.map((x) => x.categoryName),
      companies: (await companiesResponse).data.map((x) => x.companyName),
    },
  };
};
