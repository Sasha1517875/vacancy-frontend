import Link from "next/link";
import React from "react";
import { Job } from "~/types";

type JobItemProps = {
  job: Job;
};

const JobItem = ({ job }: JobItemProps) => {
  return (
    <Link href={`/job/${job.id}`}>
      <div className="flex flex-col container p-4 bg-teal-200 w-72 items-center h-full">
        <div className="text-3xl font-bold text-gray-800 text-center">{job.title}</div>
        <div className="text-xl text-gray-700">Категория: {job.category}</div>
        <div className="text-xl text-gray-700">Компания: {job.company}</div>
        <div className="text-xl text-gray-700">Зарплата: {job.salary} ₽</div>
        <div className="text-xl text-gray-700">Город: {job.location}</div>
      </div>
    </Link>
  );
};

export default JobItem;
