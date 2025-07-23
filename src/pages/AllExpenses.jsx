import { useEffect, useState } from 'react';
import { db, deleteExpense } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AllExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOption, setSortOption] = useState('date-desc');

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      const q = query(collection(db, 'expenses'), orderBy('createdAt', 'desc'));
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

  const handleDelete = async (id) => {
    await deleteExpense(id);
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Filter & Sort
  const filteredExpenses = expenses
    .filter(exp =>
      filterCategory === 'All' ? true : exp.category === filterCategory
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt?.toDate?.() || 0);
      const dateB = new Date(b.createdAt?.toDate?.() || 0);

      switch (sortOption) {
        case 'date-desc':
          return dateB - dateA;
        case 'date-asc':
          return dateA - dateB;
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

  const total = filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);

  const categoryData = Object.values(
    filteredExpenses.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = { name: curr.category, value: 0 };
      }
      acc[curr.category].value += Number(curr.amount);
      return acc;
    }, {})
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff6666'];

  return (
    <div>
      <h2>All Expenses</h2>

      {/* Filters */}
      <div className="filters">
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Other">Other</option>
        </select>

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="date-desc">Date (Newest)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="amount-desc">Amount (High to Low)</option>
          <option value="amount-asc">Amount (Low to High)</option>
        </select>
      </div>

      {/* Summary Chart */}
      <div className="summary">
        <h3>Total: KES {total.toLocaleString()}</h3>

        {categoryData.length > 0 && (
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
        )}
      </div>

      {/* Expenses List */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul className="expense-list">
          {filteredExpenses.map((expense) => (
            <li key={expense.id} className="expense-card">
              <div className="expense-header">
                <h4>{expense.title || 'Untitled Expense'}</h4>
                <span className="expense-amount">KES {Number(expense.amount || 0).toLocaleString()}</span>
              </div>
              <div className="expense-details">
                <span className="expense-category">{expense.category}</span>
                <span className="expense-date">
                  {expense.createdAt?.toDate?.().toLocaleDateString() || 'Unknown Date'}
                </span>
              </div>
              {expense.note && <p className="expense-note">{expense.note}</p>}
              <div className="expense-actions">
                <Link to={`/edit/${expense.id}`} className="edit-btn">Edit ✏️</Link>
                <button onClick={() => handleDelete(expense.id)} className="delete-btn">Delete ❌</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


