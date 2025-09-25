import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const calculateTotal = (type) => {
    return transactions
      .filter(t => {
        const category = categories.find(cat => cat.id === t.category_id);
        return category && category.type === type;
      })
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Budget Dashboard</h1>
      
      <div className="summary-cards">
        <div className="card income">
          <h3>Total Income</h3>
          <p className="amount">${calculateTotal('income').toFixed(2)}</p>
        </div>
        <div className="card expense">
          <h3>Total Expenses</h3>
          <p className="amount">${Math.abs(calculateTotal('expense')).toFixed(2)}</p>
        </div>
        <div className="card balance">
          <h3>Balance</h3>
          <p className="amount">${(calculateTotal('income') + calculateTotal('expense')).toFixed(2)}</p>
        </div>
      </div>

      <div className="recent-transactions">
        <h2>Recent Transactions</h2>
        <div className="transaction-list">
          {transactions.slice(0, 5).map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-info">
                <span className="description">{transaction.description}</span>
                <span className="category">{getCategoryName(transaction.category_id)}</span>
              </div>
              <div className="transaction-amount">
                <span className={parseFloat(transaction.amount) >= 0 ? 'positive' : 'negative'}>
                  ${parseFloat(transaction.amount).toFixed(2)}
                </span>
                <span className="date">{new Date(transaction.transaction_date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
