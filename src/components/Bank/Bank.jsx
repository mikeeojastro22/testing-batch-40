import './Bank.css';
import { useState } from 'react';
import data from '../../assets/data.json';
import Button from '@mui/material/Button';
import { Input } from 'antd';

function Bank() {
    const [users, setUsers] = useState(data);
    const [show, setShow] = useState(false); // flag to hide or show the element
    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState("");
  
    const userExist = (name) => {
      // find
      // returns a boolean value given the condition
      return users.find((user) => user.name === name);
    }
  
    const findUser = (name) => {
      // filter - returns an array
      // it should match the condition for the element to be returned
      let foundUser = users.filter((user) => user.name === name);
      return foundUser[0];
    }
  
    const transferMoney = (event) => {
      event.preventDefault();
      const newAmount = Number(amount);
      // are the users existing?
      // sender sending money to himself?
      // new amount valid?
      if(userExist(sender) && userExist(receiver) && sender !== receiver && newAmount > 0){
        // update our users array
        // new balance of sender and receiver should be reflected
        // map - returns a new array with the updated details of each user

        const senderInfo = findUser(sender);

        if(senderInfo.balance >= newAmount){
          const updatedUsers = users.map((user) => {
            if(user.name === sender){
              /**
               * {
               *  id: 0
               *  name: john
               *  balance: 50000
               * }
               * 
               * amount to be tranferred: 10000
               */
              return {
                // returns the other key values of user
                ...user,
                balance: user.balance - newAmount
              }

              /**
               * { 
               *  id: 0
               *  name: john
               *  balance: 40000
               * }
               */
            } else if (user.name === receiver){
              return {
                ...user,
                balance: user.balance + newAmount
              }
            }
            return user;
          });
          setUsers(updatedUsers);
        } else {
          alert('Not enough balance!');
        }      
      } else {
        alert('Transaction invalid!');
      }

      setSender('');
      setReceiver('');
      setAmount('');
      setShow(false);
    }

    return (
        <div className="Bank">
            {
                <div>
                  {
                      users.map((user) => {
                        return <div key={user.id}> {user.name} - {user.balance} </div>
                      })
                  }
                  {/* <button onClick={() => setShow(!show)}>Show Transfer Money</button> */}
                  <Button variant="contained" color="success" onClick={() => setShow(!show)}>Show Transfer Money</Button>
                </div>
            }
            {
              show &&
              <form onSubmit={transferMoney}>
                <label>Sender: </label>
                {/* <input 
                  type="text" 
                  value={sender} 
                  onChange={(event) => setSender(event.target.value)} 
                  required
                /> */}
                <Input 
                  placeholder="Enter name"
                  type="text" 
                  value={sender} 
                  onChange={(event) => setSender(event.target.value)} 
                  required 
                />
                <br />
                <label>Receiver: </label>
                <input 
                  type="text" 
                  value={receiver} 
                  onChange={(event) => setReceiver(event.target.value)} 
                  required />
                <br />
                <label>Amount: </label>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(event) => setAmount(event.target.value)} 
                  required />
                <br />
                <button>Confirm Transfer</button>
              </form>
            }         
        </div>
    );
}

export default Bank;