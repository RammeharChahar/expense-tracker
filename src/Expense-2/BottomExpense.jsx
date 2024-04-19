import React from "react";
import "./BottomExpense.css";
import "@fontsource/open-sans"; 
import "@fontsource/open-sans/400.css"; 
import { TiDeleteOutline } from "react-icons/ti";
import { SlPencil } from "react-icons/sl";
import { IoPizzaOutline } from "react-icons/io5";
import { Cell,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
function BottomExpense() {
  const data = [
    { name: 'Page A', pv: 2400, curveValue: 1000 },
    { name: 'Page B', pv: 1398, curveValue: 800 },
    { name: 'Page C', pv: 9800, curveValue: 2000 },
  ];

  const renderCustomBar = (props) => {
    const { x, y, width, height, curveValue } = props;
    const curveHeight = curveValue || 0; // Use curveValue or default to 0 if not provided

    // Calculate path for curved bar
    const path = `M${x},${y + height} C${x},${y + height - curveHeight} ${x + width},${y + height - curveHeight} ${x + width},${y + height}`;

    return <path d={path} fill="#8884d8" />;
  };

  return (
    <div className="parent_wrapper">
      <div className="left_wrapper">
        <h1 className="text_heading">Recent Transactions</h1>
        <div className="left_div">
          <div className="recent_wrapper">
            <div className="expense_list">
          <div className="left_content">
            <div className="expense_icon"><IoPizzaOutline /></div>
            <div>
              <p className="text_list_1">Samosa</p>
              <p className="text_list_2">March 20, 2024</p>
            </div>
          </div>

          <div className="right_content">
            <p className="text_list_3">₹150</p>
            <div className="delete_icon"><TiDeleteOutline/></div>
            <div className="update_icon">
              <SlPencil className="icon-1"/>
            </div>
          </div>
          </div>
          <div className="btm_line"></div>
          </div>
        </div>
      </div>

      <div className="right_wrapper">
        <h1 className="right_main_heading">Top Expenses</h1>
        <div className="right_div">
        <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical" // Set layout to vertical for horizontal bars
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          {/* <Bar dataKey="uv" fill="#8884d8" radius={[5, 5, 5, 5]} label={{ position: 'insideRight' }}>
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#8884d8" />
              ))
            }
          </Bar> */}
        </BarChart>
      </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default BottomExpense;
