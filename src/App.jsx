import AdminDashboard from "./admin/pages/AdminDashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./admin/pages/AdminLayout";
import AddCandidateForm from "./admin/pages/AddCandidateForm";
import VotersTable from "./admin/pages/VotersTable";
import CandidatesTable from "./admin/pages/CandidateTable";
import LoginSignUpPage from "./common/pages/LoginSignUpPage";
import VoterLayout from "./pages/VoterLayout";
import Candidates from "./pages/Candidates";
import VoterProfile from "./pages/VoterProfile";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import ViewCandidatesResult from "./pages/ViewCandidatesResult";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<ProtectedRoute allowedRole={['admin']}/>}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="add-candidate" element={<AddCandidateForm />} />
            <Route path="voters-list" element={<VotersTable />} />
            <Route path="candidate-list" element={<CandidatesTable />} />
          </Route>  
        </Route>

        <Route element={<ProtectedRoute allowedRole={['voter']}/>}>
          <Route path="/voter" element={<VoterLayout />}>
            <Route index element={<Candidates />} />
            <Route path="profile" element={<VoterProfile />} />
            <Route path="voting-result" element={<ViewCandidatesResult />} />
          </Route>
        </Route>

        

        <Route path="/login" element={<LoginSignUpPage />} />
        <Route path="/unauth-page" element={"UnauthorizedPage"} />
        <Route path="/home-page" element={"Home Page for everyone"} />
        <Route path="*" element={"Page Not Found 404"} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
