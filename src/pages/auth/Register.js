import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [role, setRole] = useState("jobseeker");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.message || "Registration failed"
        );
        return;
      }

      setMessage(
        "Account created successfully!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);

   } catch (err) {
  setMessage(err.message);
}
  }

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">

      <div
        className="
          bg-white
          w-full
          max-w-lg
          p-8
          rounded-2xl
          shadow-sm
          border
        "
      >
        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Join JobHub and start your journey
        </p>

        {message && (
          <p
            className={`text-center mt-4 text-sm ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >

          <div>
            <label className="block mb-2 text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="
                w-full
                border
                rounded-xl
                p-3
                outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                border
                rounded-xl
                p-3
                outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
              required
            />
          </div>

          {/* Password */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                  w-full
                  border
                  rounded-xl
                  p-3
                  pr-12
                  outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                "
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              >
                <i
                  className={
                    showPassword
                      ? "fa-regular fa-eye-slash"
                      : "fa-regular fa-eye"
                  }
                ></i>
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  rounded-xl
                  p-3
                  pr-12
                  outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                "
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              >
                <i
                  className={
                    showConfirmPassword
                      ? "fa-regular fa-eye-slash"
                      : "fa-regular fa-eye"
                  }
                ></i>
              </button>

            </div>

          </div>

          {/* Role */}

          <div>
            <label className="block mb-3 text-sm font-medium">
              Role
            </label>

            <div className="flex gap-6">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="jobseeker"
                  checked={role === "jobseeker"}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                />
                <span>Job Seeker</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={role === "recruiter"}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                />
                <span>Recruiter</span>
              </label>

            </div>

          </div>

          <button
            type="submit"
            className="
              w-full
              bg-indigo-600
              text-white
              py-3
              rounded-xl
              hover:bg-indigo-700
              transition
            "
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium"
          >
            Login
          </Link>
        </p>

      </div>

    </section>
  );
}

export default Register;