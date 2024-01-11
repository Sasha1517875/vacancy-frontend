import React, { useState } from "react";
import { Job, ValueNamePair } from "~/types";
import { DropDown } from "./DropDowsn";
import { useForm } from "react-hook-form";

type JobFormProps = {
  job?: Job;
  categories: string[];
  companies: string[];
  onSubmit: (job: Job) => void;
};

type Inputs = {
  title: string;
  city: string;
  salary: number;
  description: string;
};

export const JobForm = ({
  job,
  categories,
  companies,
  onSubmit,
}: JobFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [company, setCompany] = useState(job?.company ?? companies[0] ?? "");
  const [category, setCategory] = useState(job?.category ?? categories[0] ?? "");

  const createJob = (inputs: Inputs) => {
    const newJob = {
      title: inputs.title,
      company: company,
      category: category,
      location: inputs.city,
      salary: inputs.salary,
      description: inputs.description,
    };
    onSubmit(newJob);
  };

  const handleCategoryChange = ({ value }: ValueNamePair<string>) => {
    setCategory(value);
  };

  const handleCompanyChange = ({ value }: ValueNamePair<string>) => {
    setCompany(value);
  };

  return (
    <form
      onSubmit={handleSubmit(createJob)}
      className="flex w-full flex-col gap-3  text-2xl"
    >
      <input
        type="text"
        placeholder="Название"
        className="rounded border p-2"
        defaultValue={job?.title}
        {...register("title", { required: true })}
      />
      <input
        type="number"
        placeholder="Зарплата"
        {...register("salary", {
          required: true,
          min: 1,
          valueAsNumber: true,
        })}
        defaultValue={job?.salary}
        className="rounded border p-2"
      />
      <input
        className="rounded border p-2"
        type="text"
        placeholder="Город"
        defaultValue={job?.location}
        {...register("city", { required: true })}
      />
      <div className="flex gap-4">
        <DropDown
          value={{ value: category, name: category }}
          options={categories.map((x) => ({ value: x, name: x }))}
          onChange={handleCategoryChange}
        />
        <DropDown
          value={{ value: company, name: company }}
          options={companies.map((x) => ({ value: x, name: x }))}
          onChange={handleCompanyChange}
        />
      </div>
      <textarea
        placeholder="Описание"
        {...register("description", { required: true })}
        className="rounded border p-2"
        inputMode="text"
        defaultValue={job?.description}
      />
      <input type="submit" value="Разместить" className="bg-teal-100 border rounded p-4"/>
    </form>
  );
};
