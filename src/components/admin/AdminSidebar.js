import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Jobs", path: "/admin/jobs" },
    { name: "Applications", path: "/admin/applications" },
    { name: "Messages", path: "/admin/messages" },
  ];

  return (
    <aside className="w-64 min-h-screen sticky top-0 bg-white border-r shrink-0">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-indigo-600">
          JobHub Admin
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Management Panel
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-3 rounded-xl transition ${
              location.pathname === link.path
                ? "bg-indigo-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;