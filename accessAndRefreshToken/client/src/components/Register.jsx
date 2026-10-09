import { useContext } from "react";
import Section from "../context/Context";


const Register = () => {

const data = useContext(Section.store)



  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-zinc-400 mt-2">
            Create your account to get started
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl">

          <form className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg
                bg-zinc-900 border border-zinc-800
                text-white placeholder-zinc-500
                outline-none
                focus:border-orange-500
                focus:ring-1 focus:ring-orange-500
                transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg
                bg-zinc-900 border border-zinc-800
                text-white placeholder-zinc-500
                outline-none
                focus:border-orange-500
                focus:ring-1 focus:ring-orange-500
                transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-lg
                bg-zinc-900 border border-zinc-800
                text-white placeholder-zinc-500
                outline-none
                focus:border-orange-500
                focus:ring-1 focus:ring-orange-500
                transition"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg
              bg-orange-500 hover:bg-orange-600
              text-black font-semibold
              transition duration-200
              active:scale-[0.98]"
            >
              Create Account
            </button>

          </form>

          {/* Login */}
          <div className="text-center mt-6">
            <p className="text-sm text-zinc-400">
              Already have an account?{" "}
              <span className="text-orange-500 font-medium cursor-pointer hover:underline">
                Login
              </span>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;