import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import AllExpenses from "./pages/AllExpenses";
import EditExpense from "./pages/EditExpense";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><strong>💸 Finance Tracker</strong></li>
            {user ? (
              <>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/add">Add Expense</Link></li>
                <li><Link to="/expenses">All Expenses</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
            <div className="auth-section">
              {user && (
                <>
                  <span className="user-info">Welcome, {user.email}</span>
                  <button onClick={() => signOut(auth)} className="logout-btn">Logout</button>
                </>
              )}
            </div>
          </ul>
        </nav>
        
        <div className="container">
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add" element={<AddExpense />} />
                <Route path="/expenses" element={<AllExpenses />} />
                <Route path="/edit/:id" element={<EditExpense />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Login />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
