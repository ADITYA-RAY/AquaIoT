import { LockClosedIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function Verification() {
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
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div class="h-screen px-3">
              <div class="container mx-auto">
                <div class="max-w-sm mx-auto md:max-w-lg">
                  <div class="w-full">
                    <div class="bg-transparent  rounded text-center">
                      <div class="flex flex-col mt-4 text-white">
                        <span>Enter the OTP you received at</span>
                        <span class="font-bold">+91 ******876</span>
                      </div>
                      <div
                        id="otp"
                        class="flex flex-row justify-center text-center px-2 mt-5"
                      >
                        <input
                          class="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          id="first"
                          maxlength="1"
                        />
                        <input
                          class="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          id="second"
                          maxlength="1"
                        />
                        <input
                          class="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          id="third"
                          maxlength="1"
                        />
                        <input
                          class="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          id="fourth"
                          maxlength="1"
                        />
                        <input
                          class="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          id="fifth"
                          maxlength="1"
                        />
                        <input
                          class="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          id="sixth"
                          maxlength="1"
                        />
                      </div>
                      <div class="flex justify-center text-center mt-5">
                        <a class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                          <span class="font-bold">Resend OTP</span>
                          <i class="bx bx-caret-right ml-1"></i>
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
