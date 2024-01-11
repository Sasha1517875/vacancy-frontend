import { GetServerSideProps } from "next";
import React from "react";
import { api } from "~/api";
import { getCategories } from "~/api/categories";
import { getCompanies } from "~/api/companies";
import { JobForm } from "~/components/JobForm";
import { JobInfo } from "~/components/JobInfo";
import { Job } from "~/types";

type JobEditPageProps = {
  id: number;
  job: Job;
  companies: string[];
  categories: string[];
};

const JobEditPage = ({id, job, companies, categories }: JobEditPageProps) => {
  const handleSubmitForm = (newJob: Job) => {
    api.jobs.updateJob(id, newJob);
    window.location.replace("/");
  };

  return (
    <JobForm
      job={job}
      companies={companies}
      categories={categories}
      onSubmit={handleSubmitForm}
    />
  );
};

export const getServerSideProps: GetServerSideProps<JobEditPageProps> = async (
  ctx,
) => {
  const { params } = ctx;
  const id = params?.id;

  if (typeof id != "string") {
    return {
      notFound: true,
    };
  }
  const numberId = parseInt(id);

  if (Number.isNaN(numberId)) {
    return {
      notFound: true,
    };
  }
  const response = api.jobs.getJobById(numberId);
  const companiesResponse = getCompanies();
  const categoriesResponse = getCategories();

  return {
    props: {
      id: numberId,
      job: (await response).data,
      categories: (await categoriesResponse).data.map((x) => x.categoryName),
      companies: (await companiesResponse).data.map((x) => x.companyName),
    },
  };
};

export default JobEditPage;
