import { useState } from "react";
import { api } from "~/api";
import { getJobs } from "~/api/jobs";

import { Job, JobsRequestParams, Page } from "~/types";

export const useJobs = (initialJobs: Page<Job[]>) => {
  const [jobsPage, setJobsPage] = useState(initialJobs);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = async (params: JobsRequestParams) => {
    setIsLoading(true);

    try {
      const response = await getJobs(params);

      setJobsPage(response.data);
    } catch {
      // Обработать ошибку, например показать ее через react-toastify
    }

    setIsLoading(false);
  };

  return { jobsPage, isLoading, refetch };
};
