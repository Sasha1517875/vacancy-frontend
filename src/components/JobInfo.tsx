import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/api";
import { Job } from "~/types";

type JobInfoProps = {
  job: Job;
};

export const JobInfo = ({ job }: JobInfoProps) => {
  const router = useRouter();
  const handleDelete = () => {
    api.jobs.deleteJob(job.id ?? -1);
    router.replace("/");
  };

  return (
    <div className="container bg-teal-200 p-6 text-4xl">
      <h2 className="my-2 text-center">{job.title}</h2>
      <div className="flex w-full content-around">
        <div className="grow-0">{job.description}</div>
        <span className="grow-1 w-full max-w-[10%]"></span>
        <div className="grow-0 text-gray-700">
          <p className="">{job.company}</p>
          <p>{job.category}</p>
          <p>{job.salary} ₽</p>
          <p>{job.location}</p>
        </div>
      </div>
      <div className="mt-10 flex w-full gap-3 text-center">
        <Link
          href={`/job/edit/${job.id}`}
          className="boder round w-full bg-teal-400 p-2"
        >
          Изменить
        </Link>
        <button
          onClick={handleDelete}
          className="boder round w-full bg-teal-400 p-2"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};
