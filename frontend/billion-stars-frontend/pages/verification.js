import { LockClosedIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRouter } from "next/router";
import api from "../api";

export default function Verification() {
  const [email, setEmail] = useState("");
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [five, setFive] = useState("");
  const [six, setSix] = useState("");

  const router = useRouter();
  const verify = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      otp: one + two + three + four + five + six,
    };

    api
      .post("users/verifyotp/", data)
      .then((res) => {
        console.log(res.data);
        router.push("/dashboard");
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <>
      <div
        className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0f172a] to-[#112a64]"
        style={{ minHeight: "110vh", marginTop: "-80px" }}
      >
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              OTP Verification
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={verify}>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="h-screen px-3">
              <div className="container mx-auto">
                <div className="max-w-sm mx-auto md:max-w-lg">
                  <div className="w-full">
                    <div className="bg-transparent  rounded text-center">
                      <div className="flex flex-col mt-4 text-white">
                        <span>Enter the OTP you received at</span>
                        <span className="font-bold">+91 ******876</span>
                      </div>
                      <div
                        id="otp"
                        className="flex flex-row justify-center text-center px-2 mt-5"
                      >
                        <input
                          className="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          id="first"
                          maxLength="1"
                          onChange={(e) => {
                            setOne(e.target.value);
                          }}
                        />
                        <input
                          className="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          id="second"
                          maxLength="1"
                          onChange={(e) => {
                            setTwo(e.target.value);
                          }}
                        />
                        <input
                          className="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          id="third"
                          maxLength="1"
                          onChange={(e) => {
                            setThree(e.target.value);
                          }}
                        />
                        <input
                          className="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          id="fourth"
                          maxLength="1"
                          onChange={(e) => {
                            setFour(e.target.value);
                          }}
                        />
                        <input
                          className="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          id="fifth"
                          maxLength="1"
                          onChange={(e) => {
                            setFive(e.target.value);
                          }}
                        />
                        <input
                          className="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          id="sixth"
                          maxLength="1"
                          onChange={(e) => {
                            setSix(e.target.value);
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <LockClosedIcon
                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            aria-hidden="true"
                          />
                        </span>
                        Sign Up
                      </button>
                      <div className="flex justify-center text-center mt-5">
                        <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                          <span className="font-bold">Resend OTP</span>
                          <i className="bx bx-caret-right ml-1"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
