import React from "react";
import JobItem from "~/components/JobItem";
import { Job } from "~/types";

type JobListProps = {
  jobs: Job[];
};

const JobList = ({ jobs }: JobListProps) => {
  return (
    <div className="m-3 grid grid-cols-3 gap-2">
      {jobs.map((x) => (
        <JobItem key={x.id} job={x} />
      ))}
    </div>
  );
};

export default JobList;
