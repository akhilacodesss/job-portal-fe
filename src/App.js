import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AddJob from "./pages/recruiter/AddJob";
import MyJobs from "./pages/recruiter/MyJobs";
import EditJob from "./pages/recruiter/EditJob";
import Profile from "./pages/Profile";
import Applicants from "./pages/recruiter/Applicants";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import UserDashboard from "./pages/UserDashboard";
import SavedJobs from "./pages/SavedJobs";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-job" element={<ProtectedRoute><AddJob /></ProtectedRoute>} />
          <Route path="/my-jobs" element={<ProtectedRoute> <MyJobs /> </ProtectedRoute>} />
          <Route path="/edit-job/:id" element={<ProtectedRoute> <EditJob /> </ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute> {JSON.parse(localStorage.getItem("user"))?.role === "jobseeker"
            ? <Profile /> : <Navigate to="/" />}
          </ProtectedRoute>} />
          <Route path="/applicants/:jobId"
            element={
              <ProtectedRoute> <Applicants /> </ProtectedRoute>} />

          <Route path="/my-applications"
            element={<ProtectedRoute> <MyApplications /> </ProtectedRoute>} />
          <Route
            path="/recruiter-dashboard" element={
              <ProtectedRoute> <RecruiterDashboard /> </ProtectedRoute>} />
          <Route
            path="/saved-jobs"
            element={
              <ProtectedRoute>
                <SavedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {JSON.parse(localStorage.getItem("user") || "null")?.role === "recruiter"
                  ? <RecruiterDashboard />
                  : <UserDashboard />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/jobs"
            element={
              <AdminRoute>
                <AdminJobs />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/applications"
            element={
              <AdminRoute>
                <AdminApplications />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/messages"
            element={
              <AdminRoute>
                <AdminMessages />
              </AdminRoute>
            }
          />
          <Route
  path="*"
  element={<Navigate to="/" />}
/>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;