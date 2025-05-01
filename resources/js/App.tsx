import {
    Route,
    BrowserRouter as Router,
    Routes,
    Navigate,
} from "react-router-dom";
import Login from "./auth/pages/Login";
import { Dashboard } from "./dashboard/pages/Dashboard";
import { Sidebar } from "./shared/components/Sidebar";
import { Navbar } from "./shared/components/Navbar";
import { WebsiteManagement } from "./websiteManagement/pages/WebsiteManagement";
import { Users } from "./admin/pages/Users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JSX } from "react";
import { BlogTextsPage } from "./blogs/pages/BlogTexts";
import { ConversionKeywordsPage } from "./conversion/pages/ConversionKeywords";
import { ConversionKeywordProvider } from "./conversion/contexts/ConversionKeywordContext";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        toast.error("Você precisa estar autenticado para acessar essa página.");
        return <Navigate to="/" />;
    }
    return children;
};

export const App = () => {
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route index element={<Login />} />
                <Route
                    path="/blog"
                    element={
                        <ProtectedRoute>
                            <div className="flex">
                                <Sidebar />
                                <div className="flex-1">
                                    <Navbar />
                                    <BlogTextsPage />
                                </div>
                            </div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/website-management"
                    element={
                        <ProtectedRoute>
                            <div className="flex">
                                <Sidebar />
                                <div className="flex-1">
                                    <Navbar />
                                    <WebsiteManagement />
                                </div>
                            </div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <ConversionKeywordProvider>
                                <div className="flex">
                                    <Sidebar />
                                    <div className="flex-1">
                                        <Navbar />
                                        <Dashboard />
                                    </div>
                                </div>
                            </ConversionKeywordProvider>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/conversion"
                    element={
                        <ProtectedRoute>
                            <ConversionKeywordProvider>
                                <div className="flex">
                                    <Sidebar />
                                    <div className="flex-1">
                                        <Navbar />
                                        <ConversionKeywordsPage />
                                    </div>
                                </div>
                            </ConversionKeywordProvider>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <div className="flex">
                                <Sidebar />
                                <div className="flex-1">
                                    <Navbar />
                                    <Users />
                                </div>
                            </div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};
