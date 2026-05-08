import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import { AuthGates } from "./pages/AuthGates";
import { Account } from "./pages/Account";
import { Dashboard } from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthGates />} />
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
