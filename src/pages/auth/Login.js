import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch {
      setMessage("Something went wrong");
    }
  }

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div
        className="
          bg-white
          w-full
          max-w-md
          p-8
          rounded-2xl
          shadow-sm
          border
        "
      >
        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Sign in to your account
        </p>

        {message && (
          <p
            className={`text-center mt-4 text-sm ${
              message.includes("successful")
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

          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
                  setShowPassword(!showPassword)
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
            Login
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </section>
  );
}

export default Login;