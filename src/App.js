import './App.css';
import TopExpense from './Expense-1/TopExpense';
import BottomExpense from './Expense-2/BottomExpense';

function App() {
  return (
    <div className="App">
     <h1 className='main_heading'>Expense Tracker</h1>
     <TopExpense />
     {/* <BottomExpense /> */}
    </div>
  );
}

export default App;
