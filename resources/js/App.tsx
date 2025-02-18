import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "./auth/pages/Login"
import { Dashboard } from "./dashboard/pages/Dashboard"
import {Sidebar} from "./shared/components/Sidebar"
import {Navbar} from "./shared/components/Navbar"
import {WebsiteManagement} from "./websiteManagement/pages/WebsiteManagement"
import { Users } from "./admin/pages/Users"

export const App = () => {
    return (
        <Router>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="/website-management" element={
                        <div className="flex">
                            <Sidebar />
                            <div className="flex-1">
                                <Navbar />
                                <WebsiteManagement />
                            </div>
                        </div>
                    } />
                    <Route path="/dashboard" element={
                        <div className="flex">
                            <Sidebar />
                            <div className="flex-1">
                                <Navbar />
                                <Dashboard />
                            </div>
                        </div>
                    } />
                    <Route path="/users" element={
                        <div className="flex">
                            <Sidebar />
                            <div className="flex-1">
                                <Navbar />
                                <Users />
                            </div>
                        </div>
                    } />
                </Routes>
        </Router>
    )
}
