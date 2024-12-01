import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/table.component';
import EmployeeFormDialog from '../components/employee-form-modal.component';
import DeleteConfirmationDialog from '../components/delete-confirmation-dialog.component';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {API_GET_LIST, API_DELETE_LIST, TABLE_HEADERS} from '../utils/const.utils';

const EmployeePage = () => {
    const [resultData, setResultData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [dataToDelete, setDataToDelete] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  
    const employeeHeaders = TABLE_HEADERS.Employee;
    
    const fetchEmployeeData = async () => {
      try { let response = null;
        if(searchFilter === '')
        {
          response = await fetch(API_GET_LIST.GetEmployees);
        }
        else
        {
          response = await fetch(API_GET_LIST.GetEmployees+'?cafeName='+searchFilter);  
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        
        return data;
  
      } catch (error) {
        throw new Error(`Fetch failed: ${error.message}`);
      }
    };
  
    useEffect(() => {
      const getCafeData = async () => {
        try {
            const data = await fetchEmployeeData();
            setResultData(data);
            populateEmployeeData(data); 
        } catch (error) {
            console.log(error.message);
        }
      };
  
      getCafeData();
    }, []);
    
    const handleFilterChange = (e) => {
        const { value } = e.target;
        setSearchFilter(value);
    }

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            const data = await fetchEmployeeData();
            setResultData(data);
            populateEmployeeData(data);
        }
    };

    const populateEmployeeData = (data) => {
        setEmployeeData(data.map(employee => [
            employee.employeeID,
            employee.fullName,
            employee.email,
            employee.phoneNumber,
            employee.numberOfDaysWorked,
            employee.cafeName,
        ])); 
    }
    
    const handleOpenModal = () => {
        setDataToEdit(null);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setDataToEdit(null);
        setOpenModal(false);
    };
    
    const handleEditRow = (index) => {
        setDataToEdit(resultData[index]);
        setOpenModal(true);
    };
    
    const handleDeleteRow = (index) => {
        setDataToDelete(resultData[index]);
        setDeleteConfirmationOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteConfirmationOpen(false);
        setDataToDelete(null);
    };
    
    const executeDelete = async (rowToDelete) => {
        if (!rowToDelete) return;

        try {
            await axios.delete(`${API_DELETE_LIST.DeleteEmployee}/${rowToDelete.employeeID}`);

            const data = await fetchEmployeeData();
            setResultData(data);
            populateEmployeeData(data);

            setDeleteConfirmationOpen(false);
            setDataToDelete(null);
        } catch (error) {
            console.error('Error deleting the row:', error);
        }
    };

  return (
    <Box sx={{ padding: 3 }}>
        <Typography 
            variant="h2" 
            component="h1" 
            align="center" 
            sx={{ marginBottom: 3 }}
        >
            Employee Lists
        </Typography>
        <Grid2  container spacing={2} sx={{ marginBottom: 2 }} alignItems="center" justifyContent="space-between">
            <Grid2 xs={8} sx={{ display: 'flex' }}>
            <TextField
                label="Filter by cafe"
                variant="outlined"
                value={searchFilter}
                onChange={handleFilterChange}
                onKeyDown={(e) => handleKeyPress(e)}
                fullWidth
            />
            </Grid2>
            <Grid2 xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
                variant="contained"
                color="#6F4E37"
                onClick={handleOpenModal}
                fullWidth
                sx={{
                    backgroundColor: '#6F4E37', 
                    '&:hover': {
                        backgroundColor: '#6F4E37',
                    },
                    color: 'white'
                }}
            >
                New
            </Button>
            </Grid2>
        </Grid2>
      {/* <h2>Employee Lists</h2>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        New
      </Button> */}
      <Table headers={employeeHeaders} data={employeeData} handleEditRow={handleEditRow} handleDeleteRow={handleDeleteRow}/>
      <EmployeeFormDialog
        open={openModal}
        dataToEdit={dataToEdit}
        onClose={handleCloseModal}
        fetchEmployeeData={fetchEmployeeData}
        setResultData={setResultData}
        populateEmployeeData={populateEmployeeData}
      />
      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        rowToDelete={dataToDelete}
        onClose={handleCloseDeleteDialog}
        executeDelete={executeDelete}
      />
    </Box>
  );
};

export default EmployeePage;