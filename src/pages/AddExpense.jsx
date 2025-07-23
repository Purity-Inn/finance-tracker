import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

export default function AddExpense() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please log in to add expenses.');
      navigate('/login');
      return;
    }

    if (!title || !amount || !category || !date) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'expenses'), {
        title,
        amount: parseFloat(amount),
        category,
        note,
        date: Timestamp.fromDate(new Date(date)),
        createdAt: Timestamp.now(),
        userId: user.uid
      });

      // Reset form
      setTitle('');
      setAmount('');
      setCategory('');
      setNote('');
      setDate('');
      alert('Expense added successfully!');
      navigate('/expenses');
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Error saving expense. Please try again.');
    }
  };

  return (
    <div className="add-expense">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What did you spend on?"
            required
          />
        </div>

        <div className="form-group">
          <label>Amount (KES):</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
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
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Note (Optional):</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Additional details..."
            rows="3"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">Add Expense</button>
          <button type="button" onClick={() => navigate('/expenses')} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

