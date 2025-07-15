import { useState } from 'react';
import './Budget.css';
import { PieChart } from '@mui/x-charts/PieChart';

function Budget() {
    const [expense, setExpense] = useState("");
    const [price, setPrice] = useState("");
    const [budget, setBudget] = useState(10000);
    const [itemList, setItemList] = useState([]);

    const addExpense = () => {
        const newPrice = Number(price);
        if(newPrice < 0){
            alert('Invalid amount!');
        } else {
            const newExpense = {
                id: itemList.length,
                label: expense,
                value: newPrice
            }
            const newList = [...itemList, newExpense];
            setItemList(newList);
            // const newBudget = budget - newPrice;
            // setBudget(newBudget);
            setBudget(budget - newPrice);
        }
        setExpense('');
        setPrice('');
    }

    return (
        <div className='Budget'>
            <p>My budget: {budget}</p>
            {
                itemList.map((item) => {
                    return <div key={item.id}> {item.label} - {item.value} </div>
                })
            }
            <label>Expense: </label>
            <input 
                type="text" 
                value={expense} 
                onChange={(event) => setExpense(event.target.value)}
            />
            <label>Price: </label>
            <input 
                type="number" 
                value={price} 
                onChange={(event) => setPrice(event.target.value)}
            />
            <br />
            <button onClick={addExpense}>Add Expense</button>
            <PieChart
                series={[
                    {
                    data: itemList,
                    },
                ]}
                width={200}
                height={200}
            />
            
        </div>
    );
}

export default Budget;