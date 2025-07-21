import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function AddExpense() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'expenses'), {
        amount: parseFloat(amount),
        category,
        note,
        date: Timestamp.fromDate(new Date(date)),
        createdAt: Timestamp.now()
      });

      // Reset form
      setAmount('');
      setCategory('');
      setNote('');
      setDate('');
      alert('Expense added!');
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Error saving expense.');
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount (KES):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="School">School</option>
            <option value="Rent">Rent</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />

        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Note:
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
        <br />

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

