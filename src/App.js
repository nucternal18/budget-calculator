import React, { useState, Fragment, useEffect} from 'react';
import uuid from 'uuid/v4'

import Form from './components/ExpenseForm';
import List from './components/ExpenseList';
import Alert from './components/Alert';
import './App.css';


// const InitExpenses = [
//   {
//     id: uuid(),
//     charge: "rent",
//     amount: 1700
//   },
//   {
//     id: uuid(),
//     charge: "council tax",
//     amount: 196
//   },
//   {
//     id: uuid(),
//     charge: "utilities",
//     amount: 114
//   },
// ]

const initExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
const App = () => {

  //  ********* State Values **********
  //all expenses
  const [expenses, setExpenses] = useState(initExpenses);
  // single expense
  const [charge, setCharge] = useState('');
  // single amount
  const [amount, setAmount] = useState('');
  // alert
  const [alert, setAlert] = useState({ show: false });
  //edit
  const [edit, setEdit] = useState(false);
  //edit item
  const [id, setId] = useState(0);

  //  ********* State Values **********
  useEffect(() => {
    console.log('we called useEffect')
    localStorage.setItem('expenses', JSON.stringify(expenses));
    // eslint-disable-next-line
  }, [expenses])


  //  ********* Functionality **********
  // handle charge
  const handleCharge = e => {
    setCharge(e.target.value);
  }
  //handle amount
  const handleAmount = e => {
    setAmount(e.target.value);
  }
  // handle alert
  const handleAlert = ({type, text}) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({show: false})
    }, 3000)
  }
  // handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item,charge,amount} : item;
        });
        setExpenses(tempExpenses);
        setEdit(false)
        handleAlert({ type: 'success', text: 'item edited'})
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: 'success', text: 'item added'})
      }
      setCharge('');
      setAmount('');
    } else {
      // handle alert called
      handleAlert({type: 'danger', text: `charge can't be empty value and amount of value has to be bigger than zero`})
    }
  }
  // clear all items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: 'danger', text: 'All items deleted' });
  };

  //handle delete 
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({type: 'danger', text: 'item deleted'})
  }
  //handle edit 
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id)
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id)
  }

  return (
    <Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
      <h1>My Budget Calculator</h1>
      <main className='App'>
        <Form
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <List
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending:{' '}
        <span className='total'>
          ${' '}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </Fragment>
  );
}

export default App;
