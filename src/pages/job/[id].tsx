import { GetServerSideProps } from "next";
import React from "react";
import { api } from "~/api";
import { JobInfo } from "~/components/JobInfo";
import { Job } from "~/types";

type JobsDetailsPageProps = {
  job: Job;
};

const JobDetailsPage = ({ job }: JobsDetailsPageProps) => {
  return (
    <JobInfo job={job}/>
  );
};

export const getServerSideProps: GetServerSideProps<
  JobsDetailsPageProps
> = async (ctx) => {
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
  const response = await api.jobs.getJobById(numberId);

  return { props: { job: response.data } };
};

export default JobDetailsPage;
