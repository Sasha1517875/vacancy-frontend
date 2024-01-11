
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import { api } from "~/api";
import { getCategories } from "~/api/categories";
import { getCompanies } from "~/api/companies";
import { addJob } from "~/api/jobs";
import { JobForm } from "~/components/JobForm";
import { Job } from "~/types";

type AddJobProps = {
  companies: string[];
  categories: string[];
};



export const AddJob = ({ companies, categories}: AddJobProps) => {
  const handleFormSubmit = (job:Job) => {
    addJob(job);
    window.location.replace("/");
  }
  return <JobForm categories={categories} companies={companies} onSubmit={handleFormSubmit}/>;
};

export const getServerSideProps: GetServerSideProps<AddJobProps> = async () => {
  const companies = getCompanies();
  const categories = getCategories();
  return {
    props: {
      categories: (await categories).data.map((x) => x.categoryName),
      companies: (await companies).data.map((x) => x.companyName),
    },
  };
};

export default AddJob;
