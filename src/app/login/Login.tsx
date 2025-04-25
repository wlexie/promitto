"use client"; // ← Important in Next.js App Router
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import "@fontsource/poppins";

function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
  
    // Allow any email or phone number (you can add more validation if needed)
    if (formData.username && formData.password) {
      // Simulated delay for API call placeholder
      setTimeout(() => {
        setLoading(false);
        router.push("/verify-otp");
      }, 1000);
    } else {
      setLoading(false);
      // Optionally show an error message
    }
  };
  

  return (
    <div className="flex flex-wrap">
      <div className="pointer-events-none relative hidden h-screen select-none md:block md:w-1/2">
        <img
          src="/bg.png"
          alt="Background"
          className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
        />
      </div>
      <div className="flex w-full flex-col md:w-1/2 p-16 pr-36">
        <div className="lg:w-full mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <div className="mx-4">
            <img
              src="/promitto_logo.png"
              alt="Logo"
              className="w-20 h-20 px-2 py-2"
            />
            <p className="text-left text-3xl font-bold py-6">
              Login to your account
            </p>
            <p className="whitespace-nowrap text-lg text-gray-600">
              No account?{" "}
              <Link
                href="/signup"
                className="underline-offset-4 font-semibold text-[#FFC300] underline"
              >
                Sign Up.
              </Link>
            </p>
            <hr className="my-6" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col pt-3 md:pt-8 mx-4"
          >
            <div className="grid gap-3 md:grid-cols-1">
              <div className="flex-1">
                <label className="block text-sm text-gray-400">
                  PHONE NUMBER / EMAIL
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border bg-white px-2 py-3 dark:text-black outline-none ring-gray-400 focus:ring-1"
                  placeholder=""
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm text-gray-400">
                  PASSWORD
                  <span className="text-red-600">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder=""
                    className="block w-full py-3 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 dark:bg-white dark:text-gray-300 dark:border-gray-600 focus:border-gray-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute -right-64 text-3xl text-gray-500 focus:outline-none w-1/2"
                  >
                    {isPasswordVisible ? (
                      <IoEyeOutline className="mx-0 text-gray-600 " />
                    ) : (
                      <IoEyeOffOutline className="mx-0 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-gray-900 dark:bg-[#050505] px-4 py-3 mt-4 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 flex items-center justify-center"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <center>
            <div className="py-6 -mr-18 text-yellow-400">
              <Link
                href="/forgot-password"
                className="whitespace-nowrap underline"
              >
                Forgot password?
              </Link>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Login;
