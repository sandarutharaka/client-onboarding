import Header from "@/components/header";
import OnboardingForm from "@/components/OnboardingForm";
import { Suspense } from "react";


export default function Home() {
  return (
    <main>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Left Side */}
          <div className="hidden md:flex bg-blue-800 flex-1 flex-col justify-center items-center p-8 text-white relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">B</div>
              <h1 className="text-2xl font-bold">Besta.App</h1>
            </div>
            <h2 className="text-3xl font-semibold mb-4 text-center">
              Welcome to Client Onboarding
            </h2>
            <p className="text-center max-w-xs">
              Please fill out the form to get started. Our team will review your information and contact you shortly.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10">
            <div className="w-full max-w-lg">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                Client Onboarding
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2 mb-6">
                Please fill the form below.
              </p>

              <Suspense fallback={<p>Loading form...</p>}>
                <OnboardingForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
