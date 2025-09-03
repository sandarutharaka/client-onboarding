"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData, servicesOptions } from "../lib/formSchema";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OnboardingForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceParams = searchParams.get("service");
  const preSelectedServices = serviceParams
    ? serviceParams
        .split(",")
        .filter((s): s is (typeof servicesOptions)[number] =>
          servicesOptions.includes(s as typeof servicesOptions[number])
        )
    : [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      services: preSelectedServices,
      budget: "",
      projectStartDate: "",
      acceptTerms: false,
    },
  });

  const services = useWatch({ control, name: "services" });

  useEffect(() => {
    const queryString = services.map(encodeURIComponent).join(",");
    router.replace(queryString ? `/?service=${queryString}` : `/`);
  }, [services, router]);

  const onSubmit = async (data: FormData) => {
    try {
      setSuccessMessage(null);
      setErrorMessage(null);
      const baseUrl = process.env.NEXT_PUBLIC_ONBOARD_URL;
      const res = await fetch(`${baseUrl}/api/onboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      await res.json();
      setSuccessMessage(
        `Form submitted successfully! 🎉\nFull Name: ${data.fullName}\nEmail: ${data.email}\nCompany: ${data.companyName}\nServices: ${data.services.join(", ")}\nBudget: ${data.budget || "N/A"}\nProject Start Date: ${data.projectStartDate}\nAccepted Terms: ${data.acceptTerms ? "Yes" : "No"}`
      );
      reset();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit form."
      );
    }
  };

  return (
    <>
      {successMessage && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 border border-green-400 whitespace-pre-line">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-400">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block font-medium mb-1">Full Name</label>
          <input
            {...register("fullName")}
            type="text"
            id="fullName"
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block font-medium mb-1">Company Name</label>
          <input
            {...register("companyName")}
            type="text"
            id="companyName"
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.companyName ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your company name"
          />
          {errors.companyName && <p className="text-sm text-red-500 mt-1">{errors.companyName.message}</p>}
        </div>

        {/* Services */}
        <div>
          <fieldset>
            <legend className="font-medium text-gray-700 mb-2">Services interested in</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {servicesOptions.map((service) => (
                <label key={service} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("services")}
                    value={service}
                    className="accent-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  {service}
                </label>
              ))}
            </div>
            {errors.services && <p className="text-sm text-red-500 mt-1">{errors.services.message}</p>}
          </fieldset>
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className="block font-medium mb-1">Budget (USD)</label>
          <input
            {...register("budget")}
            type="number"
            id="budget"
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.budget ? "border-red-500" : "border-gray-300"}`}
            placeholder="Budget for the project"
          />
          {errors.budget && <p className="text-sm text-red-500 mt-1">{errors.budget.message}</p>}
        </div>

        {/* Project Start Date */}
        <div>
          <label htmlFor="projectStartDate" className="block font-medium mb-1">Project Start Date</label>
          <input
            {...register("projectStartDate")}
            type="date"
            id="projectStartDate"
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.projectStartDate ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.projectStartDate && <p className="text-sm text-red-500 mt-1">{errors.projectStartDate.message}</p>}
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-center gap-2">
            <input
              {...register("acceptTerms")}
              type="checkbox"
              className="accent-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            I accept the terms and conditions
          </label>
          {errors.acceptTerms && <p className="text-sm text-red-500 mt-1">{errors.acceptTerms.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full text-lg font-medium rounded-lg py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isValid || isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800 text-white"}`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}
