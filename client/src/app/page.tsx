"use client";
export const dynamic = "force-dynamic";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData, servicesOptions } from "../lib/formSchema";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
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

  // Use Form with zod
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
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
    if (services.length > 0) {
      const queryString = services.map(encodeURIComponent).join(",");
      router.replace(`/?service=${queryString}`);
    } else {
      router.replace(`/`);
    }
  }, [services, router]);

  // onsubmit
  const onSubmit = async (data: FormData) => {
    try {
      setSuccessMessage(null);
      setErrorMessage(null);
      const baseUrl = process.env.NEXT_PUBLIC_ONBOARD_URL;
      const res = await fetch(`${baseUrl}/api/onboard` as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      await res.json();
      setSuccessMessage(
        `Form submitted successfully! 🎉
Full Name: ${data.fullName}
Email: ${data.email}
Company: ${data.companyName}
Services: ${data.services.join(", ")}
Budget: ${data.budget || "N/A"}
Project Start Date: ${data.projectStartDate}
Accepted Terms: ${data.acceptTerms ? "Yes" : "No"}`
      );

      reset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again.";
      setErrorMessage(message);
    }
  };

  return (
    <main>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Left Side */}
          <div className="hidden md:flex bg-blue-800 flex-1 flex-col justify-center items-center p-8 text-white relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                B
              </div>
              <h1 className="text-2xl font-bold">Besta.App</h1>
            </div>
            <h2 className="text-3xl font-semibold mb-4 text-center">
              Welcome to Client Onboarding
            </h2>
            <p className="text-center max-w-xs">
              Please fill out the form to get started. Our team will review your
              information and contact you shortly.
            </p>
          </div>

          {/* Form Container */}
          <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10">
            <div className="w-full max-w-lg">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                Client Onboarding
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2 mb-6">
                Please fill the form below.
              </p>

              {/* Messages */}
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
                  <label htmlFor="fullName" className="block font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    {...register("fullName")}
                    type="text"
                    id="fullName"
                    className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-medium mb-1">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block font-medium mb-1"
                  >
                    Company Name
                  </label>
                  <input
                    {...register("companyName")}
                    type="text"
                    id="companyName"
                    className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.companyName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your company name"
                  />
                  {errors.companyName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>

                {/* Services */}
                <div>
                  <fieldset>
                    <legend className="font-medium text-gray-700 mb-2">
                      Services interested in
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {servicesOptions.map((service) => (
                        <label
                          key={service}
                          className="flex items-center gap-2"
                        >
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
                    {errors.services && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.services.message}
                      </p>
                    )}
                  </fieldset>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="block font-medium mb-1">
                    Budget (USD)
                  </label>
                  <input
                    {...register("budget")}
                    type="number"
                    id="budget"
                    className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.budget ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Budget for the project"
                  />
                  {errors.budget && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.budget.message}
                    </p>
                  )}
                </div>

                {/* Project Start Date */}
                <div>
                  <label
                    htmlFor="projectStartDate"
                    className="block font-medium mb-1"
                  >
                    Project Start Date
                  </label>
                  <input
                    {...register("projectStartDate")}
                    type="date"
                    id="projectStartDate"
                    className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.projectStartDate
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.projectStartDate && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.projectStartDate.message}
                    </p>
                  )}
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
                  {errors.acceptTerms && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.acceptTerms.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className={`w-full text-lg font-medium rounded-lg py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isValid || isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-800 text-white"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
