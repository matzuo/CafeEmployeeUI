import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {EMPLOYEE_VALIDATE_FORM} from '../utils/validator.utils';
import {API_GET_LIST, API_POST_LIST, API_PUT_LIST} from '../utils/const.utils';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const GenderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const formDataModel = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    cafe: '',
}

const EmployeeFormDialog = ({ open, onClose, fetchEmployeeData, setResultData, populateEmployeeData, dataToEdit }) => {
  const [formData, setFormData] = useState({...formDataModel});
  const [errors, setErrors] = useState({...formDataModel});
  
  const [cafeOptionsData, setCafeOptionsData] = useState([]);
  
  const fetchCafeDataOptions = async () => {
    try {
    const response = await fetch(API_GET_LIST.GetCafes);
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
        const data = await fetchCafeDataOptions();
        setCafeOptionsData(data.map(cafe => ({
            value: cafe.cafeId,
            label: cafe.name
        })));
      } catch (error) {
        console.log(error.message)
      }
    };

    getCafeData();

    if (dataToEdit) {
        setFormData({
          name: dataToEdit.fullName,
          email: dataToEdit.email,
          phone: dataToEdit.phoneNumber,
          gender: dataToEdit.gender,
          cafe: dataToEdit.cafeId ?? ''
        });
      } else {
        setFormData({...formDataModel});
      }
  }, [dataToEdit, open]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Reset the errors for the field being modified
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const errors = EMPLOYEE_VALIDATE_FORM(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
        try {
            const payload = {
              fullName: formData.name,
              email: formData.email,
              phoneNumber: formData.phone,
              gender: formData.gender,
              cafeId: formData.cafe === "" ? null : formData.cafe
            };
            if(dataToEdit)
            {
              payload.employeeID = dataToEdit.employeeID;
              await axios.put(`${API_PUT_LIST.PutEmployee}/${dataToEdit.employeeID}`, payload, {
                headers: {
                  'Content-Type': 'application/json',
                }
              });
            }
            else
            {  
              await axios.post(API_POST_LIST.PostEmployee, payload, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            }
    
            const data = await fetchEmployeeData();
            setResultData(data);
            populateEmployeeData(data);
            setFormData({...formDataModel});
            onClose();
    
          } catch (error) {
            console.error('Error saving new Cafe - ', error);
          }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Employee</DialogTitle>
      <br />
      <DialogContent>
        <TextField
          required
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          required
          label="Email Address"
          name="email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          required
          label="Phone Number"
          name="phone"
          variant="outlined"
          fullWidth
          value={formData.phone}
          onChange={handleInputChange}
          error={!!errors.phone}
          helperText={errors.phone}
          style={{ marginBottom: '10px' }}
        />
        <RadioGroup
          required
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          style={{ marginBottom: '10px' }}
        >
          {GenderOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        {errors.gender && <div style={{ color: 'red', marginBottom: '10px' }}>{errors.gender}</div>}
        <FormControl fullWidth style={{ marginBottom: '10px' }}>
          <InputLabel>Assigned Café</InputLabel>
          <Select
            label="Assigned Café"
            name="cafe"
            value={formData.cafe}
            onChange={handleInputChange}
            error={!!errors.cafe}
          >
            {cafeOptionsData.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeFormDialog;
