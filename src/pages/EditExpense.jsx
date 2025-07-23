import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { updateExpense } from "../firebase";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const docRef = doc(db, "expenses", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Convert Firestore timestamp to date string for input
          const dateStr = data.date?.toDate ? data.date.toDate().toISOString().split('T')[0] : '';
          setExpense({
            title: data.title || "",
            amount: data.amount || "",
            category: data.category || "",
            date: dateStr,
            note: data.note || ""
          });
        } else {
          alert("Expense not found");
          navigate("/expenses");
        }
      } catch (error) {
        console.error("Error fetching expense:", error);
        alert("Error loading expense");
      } finally {
        setLoading(false);
      }
    };
    fetchExpense();
  }, [id, navigate]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExpense(id, {
        ...expense,
        amount: parseFloat(expense.amount)
      });
      alert("Expense updated successfully!");
      navigate("/expenses");
    } catch (error) {
      console.error("Error updating expense:", error);
      alert("Error updating expense");
    }
  };

  if (loading) return <p>Loading expense...</p>;

  return (
    <div className="add-expense">
      <h2>Edit Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label>Title:</label>
          <input 
            name="title" 
            value={expense.title} 
            onChange={handleChange} 
            placeholder="Expense title" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Amount (KES):</label>
          <input 
            name="amount" 
            value={expense.amount} 
            onChange={handleChange} 
            placeholder="0.00" 
            type="number" 
            step="0.01"
            min="0"
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Category:</label>
          <select name="category" value={expense.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Date:</label>
          <input 
            name="date" 
            value={expense.date} 
            onChange={handleChange} 
            type="date" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Note (Optional):</label>
          <textarea 
            name="note" 
            value={expense.note} 
            onChange={handleChange} 
            placeholder="Additional details..."
            rows="3"
          />
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="submit-btn">Update Expense</button>
          <button type="button" onClick={() => navigate("/expenses")} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExpense;
