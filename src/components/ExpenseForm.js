import React from 'react';
import { MdSend } from 'react-icons/md';

const ExpenseForm = ({
    charge,
    amount,
    handleCharge,
    handleAmount,
    handleSubmit,
    edit
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="expense">Charge</label>
                    <input
                        type="text"
                        name="charge"
                        id="charge"
                        className="form-control"
                        placeholder="e.g. rent"
                        value={charge}
                        onChange={handleCharge}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        id="amount"
                        className="form-control"
                        placeholder="e.g. 100"
                        value={amount}
                        onChange={handleAmount}
                    />
                </div>
            </div>
            <button type="submit" className="btn">
                {edit ? 'edit' : 'submit'}
                <MdSend className="btn-icon" />
            </button>
        </form>
    )
}

export default ExpenseForm;
