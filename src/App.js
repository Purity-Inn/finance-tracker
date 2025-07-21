import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import AllExpenses from './pages/AllExpenses';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div><strong>💸 Finance Tracker</strong></div>
        <div>
          <Link to="/">Dashboard</Link>
          <Link to="/add">Add Expense</Link>
          <Link to="/expenses">All Expenses</Link>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/expenses" element={<AllExpenses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

