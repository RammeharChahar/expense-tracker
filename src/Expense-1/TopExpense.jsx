import React,{useEffect, useState} from "react";
import "./TopExpense.css";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import Modal from 'react-modal';
import ExpenseForm from "../FormComponent/ExpenseForm";
import AddWallet from "../AddWallet/AddWallet";
import "@fontsource/open-sans"; 
import "@fontsource/open-sans/400.css"; 
import { TiDeleteOutline } from "react-icons/ti";
import { SlPencil } from "react-icons/sl";
import { IoPizzaOutline } from "react-icons/io5";
import { LuGift } from "react-icons/lu";
import { MdCardTravel } from "react-icons/md";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function TopExpense() {
  const data = [
    { name: 'Page A', pv: 2400, curveValue: 1000 },
    { name: 'Page B', pv: 1398, curveValue: 800 },
    { name: 'Page C', pv: 9800, curveValue: 2000 },
  ];

  const [expenseAllData,setExpenseAllData] = useState([]);
  const [addExpenseData, setAddExpenseData] = useState();
  const [walletBalance, setWalletBalance] = useState(5000);
  const [totalExpenseBalance, setTotalExpenseBalance] = useState(0);
  const [pieChartArray, setPieChartArray] = useState([]);


  useEffect(() =>{
    const newArray = expenseAllData.map(item => ({
      name: item.title, 
      value: parseInt(item.price), 
    }));
    setPieChartArray(newArray);
  },[expenseAllData]);

  useEffect(() =>{
    const storedData = localStorage.getItem('expensesData');
    const storedData1 = localStorage.getItem('wallet');
    if(storedData && storedData1){
      const data = JSON.parse(storedData);
      const data1 = JSON.parse(storedData1);
      setExpenseAllData(data);
      setWalletBalance(data1);
    }
  },[])
  

  useEffect(() =>{
    if(addExpenseData){
      setExpenseAllData([...expenseAllData, addExpenseData]);
      setAddExpenseData();
    }
  },[addExpenseData]);

  useEffect(() =>{
    if(expenseAllData.length>0){
      localStorage.setItem('expensesData', JSON.stringify(expenseAllData));
      localStorage.setItem('wallet', JSON.stringify(walletBalance));
    }
  },[expenseAllData,walletBalance])

  function formatDateToMonthName(dateStr) {
    const date = new Date(dateStr); 
  
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const monthIndex = date.getMonth(); 
    const monthName = monthNames[monthIndex]; 
    const day = date.getDate(); 
    const year = date.getFullYear(); 
  
    const formattedDate = `${monthName} ${day}, ${year}`;
  
    return formattedDate;
  }

  const renderIcon = (data) => {
    if (data.category === 'Food') {
      return <IoPizzaOutline />; 
    } else if (data.category === 'Movie') {
      return <LuGift />; 
    } else {
      return <MdCardTravel />; 
    }
  };


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal1 = () => {
    setModalIsOpen1(true);
  };

  const closeModal1 = () => {
    setModalIsOpen1(false);
  };

  const handleDeleteExpense = (title) =>{
    const updatedExpenses = expenseAllData.filter(item => item.title !== title);
    setExpenseAllData(updatedExpenses);
  }

  useEffect(() =>{
    const totalBalanceSpent = expenseAllData.reduce((total, expense) => {
      return total + parseInt(expense.price);
    }, 0);
    setTotalExpenseBalance(totalBalanceSpent);
  },[expenseAllData])


  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
    <div className="expense_wrapper">
      <div className="content_wrapper">
        <p className="text_primary">
          Wallet Balance: <span className="text_sec">₹{walletBalance}</span>
        </p>
        <button className="btn_add"  onClick={openModal1}>+ Add Income</button>
      </div>

      <div className="content_wrapper">
        <p className="text_primary">
          Expenses: <span className="text_sec_1">₹{totalExpenseBalance}</span>
        </p>
        <button className="btn_add_1" onClick={openModal}>+ Add Expense</button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false} 
      >
        <div>
          <ExpenseForm setWalletBalance={setWalletBalance} walletBalance={walletBalance} closeModel={closeModal} setFormData={setAddExpenseData}/>
        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen1}
        onRequestClose={closeModal1}
        contentLabel="Example Modal"
        ariaHideApp={false} 
        className="customModal"
      >
        <div>
         <AddWallet walletBalance={walletBalance} setWalletBalance={setWalletBalance} closeModel={closeModal1}/>
        </div>
      </Modal>
      

      <ResponsiveContainer width={420} height={280}>
        <PieChart >
          <Pie
            data={pieChartArray}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            labelLine={false} 
            label={renderCustomizedLabel} 
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            align="center"
            verticalAlign="bottom"
            layout="horizontal"
            wrapperStyle={{ paddingBottom: 20 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>

    <div className="parent_wrapper">
      <div className="left_wrapper">
        <h1 className="text_heading">Recent Transactions</h1>
             <div className="left_div">
            {expenseAllData.map((data) =>(
                <div className="recent_wrapper">
                <div className="expense_list">
              <div className="left_content">
                <div className="expense_icon">{renderIcon(data)}</div>
                <div>
                  <p className="text_list_1">{data.title}</p>
                  <p className="text_list_2">{formatDateToMonthName(data.date)}</p>
                </div>
              </div>
    
              <div className="right_content">
                <p className="text_list_3">₹{data.price}</p>
                <div className="delete_icon" onClick={() => handleDeleteExpense(data.title)}><TiDeleteOutline/></div>
                <div className="update_icon">
                  <SlPencil className="icon-1"/>
                </div>
              </div>
              </div>
              <div className="btm_line"></div>
              </div>
            ))}
           </div>
      </div>

      <div className="right_wrapper">
        <h1 className="right_main_heading">Top Expenses</h1>
        <div className="right_div">
        <ResponsiveContainer width="100%" height={370}>
        <BarChart
          width={500}
          height={300}
          data={pieChartArray}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
        </div>
      </div>
    </div>
    </div>
  );
}

export default TopExpense;
