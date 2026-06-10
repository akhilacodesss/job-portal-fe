import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50 overflow-x-hidden">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-auto min-w-0">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;