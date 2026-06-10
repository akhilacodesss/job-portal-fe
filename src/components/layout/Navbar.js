import { useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const role = user?.role;

  function logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  }

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
      : "text-gray-700 hover:text-indigo-600 transition duration-200";

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Top Bar */}
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link
              to="/"
              className="text-3xl font-bold text-indigo-600"
            >
              JobHub
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 font-medium">

  <NavLink to="/" className={navLinkClass}>
    Home
  </NavLink>

  <NavLink to="/jobs" className={navLinkClass}>
    Jobs
  </NavLink>

  <NavLink to="/categories" className={navLinkClass}>
    Categories
  </NavLink>

  <NavLink to="/about" className={navLinkClass}>
    About
  </NavLink>

 {role === "admin" ? (
  <NavLink
    to="/admin/messages"
    className={navLinkClass}
  >
    Messages
  </NavLink>
) : (
  <NavLink
    to="/contact"
    className={navLinkClass}
  >
    Contact
  </NavLink>
)}

 {role === "jobseeker" && (
  <>
    <NavLink
      to="/dashboard"
      className={navLinkClass}
    >
      Dashboard
    </NavLink>

    <NavLink
      to="/profile"
      className={navLinkClass}
    >
      My Profile
    </NavLink>
  </>
)}

  {role === "recruiter" && (
    <NavLink
      to="/recruiter-dashboard"
      className={navLinkClass}
    >
      Dashboard
    </NavLink>
  )}

  {role === "admin" && (
    <NavLink
      to="/admin"
      className={navLinkClass}
    >
      Admin
    </NavLink>
  )}

</div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">

              {user ? (
                <>
                  <span className="font-medium text-gray-700">
                    Hi, {user.name}
                  </span>

                  <button
                    onClick={logoutHandler}
                    className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}

            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-3xl"
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>

          {/* Mobile Menu */}
         {/* Mobile Menu */}
{menuOpen && (
  <div className="md:hidden border-t py-4 flex flex-col gap-5 text-lg font-medium">

    <NavLink
      to="/"
      onClick={() => setMenuOpen(false)}
    >
      Home
    </NavLink>

    <NavLink
      to="/jobs"
      onClick={() => setMenuOpen(false)}
    >
      Jobs
    </NavLink>

    <NavLink
      to="/categories"
      onClick={() => setMenuOpen(false)}
    >
      Categories
    </NavLink>

    <NavLink
      to="/about"
      onClick={() => setMenuOpen(false)}
    >
      About
    </NavLink>

    {role === "admin" ? (
      <NavLink
        to="/admin/messages"
        onClick={() => setMenuOpen(false)}
      >
        Messages
      </NavLink>
    ) : (
      <NavLink
        to="/contact"
        onClick={() => setMenuOpen(false)}
      >
        Contact
      </NavLink>
    )}

   {role === "jobseeker" && (
  <>
    <NavLink
      to="/dashboard"
      onClick={() => setMenuOpen(false)}
    >
      Dashboard
    </NavLink>

    <NavLink
      to="/profile"
      onClick={() => setMenuOpen(false)}
    >
      My Profile
    </NavLink>
  </>
)}

    {role === "recruiter" && (
      <NavLink
        to="/recruiter-dashboard"
        onClick={() => setMenuOpen(false)}
      >
        Dashboard
      </NavLink>
    )}

    {role === "admin" && (
      <NavLink
        to="/admin"
        onClick={() => setMenuOpen(false)}
      >
        Admin
      </NavLink>
    )}

    {user ? (
      <>
        <span className="text-gray-600">
          Hi, {user.name}
        </span>

        <button
          onClick={logoutHandler}
          className="bg-red-500 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <Link
          to="/login"
          onClick={() => setMenuOpen(false)}
          className="border rounded-lg py-2 text-center"
        >
          Login
        </Link>

        <Link
          to="/register"
          onClick={() => setMenuOpen(false)}
          className="bg-indigo-600 text-white rounded-lg py-2 text-center"
        >
          Sign Up
        </Link>
      </>
    )}
  </div>
)}

{location.pathname !== "/" && (
  <div className="fixed bottom-6 right-6 z-50">
    <button
      onClick={handleBack}
      className="
        bg-white
        border
        border-gray-200
        px-4
        py-2
        rounded-full
        shadow-md
        hover:shadow-lg
        transition
      "
    >
      ← Back
    </button>
  </div>
)}
        </div>
      </nav>
    </>
  );
}

export default Navbar;