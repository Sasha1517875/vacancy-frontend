import { Job, JobsRequestParams, Page } from "~/types";
import { apiInstance } from "./instance";

export const getJobs = (params?: JobsRequestParams) => {
  return apiInstance.get<Page<Job[]>>("/jobs", {
    params,
    paramsSerializer: { indexes: null },
  });
};

export const getJobById = (id: number) => {
  return apiInstance.get<Job>(`/jobs/${id}`);
};

export const addJob = (job: Job) => {
  return apiInstance.post("/jobs", job);
};

export const updateJob = (id: number, job: Job) => {
  return apiInstance.put(`/jobs/${id}`, job);
};

export const deleteJob = (id: number) => {
  return apiInstance.delete(`/jobs/${id}`);
};
