import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentExpenses = async () => {
      try {
        const q = query(collection(db, 'expenses'), orderBy('createdAt', 'desc'), limit(10));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setExpenses(items);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentExpenses();
  }, []);

  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
  
  const categoryData = Object.values(
    expenses.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = { name: curr.category, value: 0 };
      }
      acc[curr.category].value += Number(curr.amount);
      return acc;
    }, {})
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff6666'];

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard">
      <h2>Finance Dashboard</h2>
      
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Total Expenses</h3>
          <p className="total-amount">KES {totalExpenses.toLocaleString()}</p>
        </div>
        
        <div className="summary-card">
          <h3>Total Transactions</h3>
          <p className="total-count">{expenses.length}</p>
        </div>
      </div>

      {categoryData.length > 0 && (
        <div className="chart-section">
          <h3>Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="recent-expenses">
        <h3>Recent Expenses</h3>
        {expenses.length === 0 ? (
          <p>No expenses yet. <Link to="/add">Add your first expense</Link></p>
        ) : (
          <div className="expense-list">
            {expenses.slice(0, 5).map((expense) => (
              <div key={expense.id} className="expense-item">
                <span className="expense-category">{expense.category}</span>
                <span className="expense-amount">KES {expense.amount}</span>
                <span className="expense-date">
                  {expense.createdAt?.toDate?.().toLocaleDateString() || 'Unknown'}
                </span>
              </div>
            ))}
          </div>
        )}
        <Link to="/expenses" className="view-all-btn">View All Expenses</Link>
      </div>
    </div>
  );
}
