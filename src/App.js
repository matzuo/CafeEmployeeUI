import CafePage from './pages/cafe-page';
import EmployeePage from './pages/employee-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './page-layout/main-layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Layout />}> 
          <Route index path='/cafe' element={ <CafePage /> } />
          <Route path='/employee' element={ <EmployeePage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
