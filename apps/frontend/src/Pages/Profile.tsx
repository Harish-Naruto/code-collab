import { ProfilePage } from "../components/Dashboard/profile-page";
import { MyProjects } from "../components/Dashboard/my-projects";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user} = useAuth();

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-700 via-blue-500 to-purple-700 opacity-30 blur-3xl rounded-full animate-pulse-slow top-[-150px] left-[-150px]" />
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-2xl rounded-full animate-pulse-slow top-[400px] right-[50px]" />
      </div>

      <div className=" z-10 max-w-7xl mx-auto p-3">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-left bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent animate-glow">
          Dashboard
          </h1>
          <p className="text-gray-400 text-lg italic animate-fade-in">
            Welcome, {user?.name || "Guest"}! Your ideas are about to come alive.
          </p>
        </div>

        <div className="space-y-8">
          <ProfilePage />
          <MyProjects />
        </div>
      </div>
    </div>
  );
}
