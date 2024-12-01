import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {API_POST_LIST, API_PUT_LIST} from '../utils/const.utils';
import {CAFE_FORM_ONCHANGE_VALIDATOR, CAFE_VALIDATE_FORM} from '../utils/validator.utils';

const formDataModel = {
  name: '',
  description: '',
  logo: null,
  location: '',
};

const CafeFormModal = ({ open, onClose, fetchCafeData, setResultData, populateCafeData, dataToEdit }) => {

  const [formData, setFormData] = useState({...formDataModel});

  const [errors, setErrors] = useState({...formDataModel});

  useEffect(() => {
    if (dataToEdit) {
      setFormData({
        name: dataToEdit.name,
        description: dataToEdit.description,
        location: dataToEdit.location,
        logo: dataToEdit.logo ? dataToEdit.logo : null,
      });
    } else {
      setFormData({...formDataModel});
    }
  }, [dataToEdit, open]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (name === 'name' || name === 'description') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: CAFE_FORM_ONCHANGE_VALIDATOR(name, value),
      }));
    }
  };

  const handleSubmit = async () => {
    const errors = CAFE_VALIDATE_FORM(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const payload = {
          name: formData.name,
          description: formData.description,
          location: formData.location,
          // logo: logoBase64, // Send the base64 encoded image as a string
        };
        if(dataToEdit)
        {
          payload.cafeId = dataToEdit.cafeId;
          await axios.put(`${API_PUT_LIST.PutCafe}/${dataToEdit.cafeId}`, payload, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
        }
        else
        {  
          await axios.post(API_POST_LIST.PostCafe, payload, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }

        const data = await fetchCafeData();
        setResultData(data);
        populateCafeData(data);
        setFormData({ name: '', description: '', logo: null, location: '' });
        onClose();

      } catch (error) {
        console.error('Error saving new Cafe - ', error);
      }
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Row</DialogTitle>
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
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          error={!!errors.description}
          helperText={errors.description}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          required
          label="Location"
          name="location"
          variant="outlined"
          fullWidth
          value={formData.location}
          onChange={handleInputChange}
          error={!!errors.location}
          helperText={errors.location}
          style={{ marginBottom: '10px' }}
        />
        <Button
          variant="outlined"
          component="label"
          fullWidth
          style={{ marginBottom: '10px' }}
        >
          Upload Logo
          <input
            type="file"
            name="logo"
            accept="image/*"
            hidden
            onChange={handleInputChange}
          />
        </Button>
        {formData.logo && (
          <div>
            <strong>Selected File:</strong> {formData.logo.name}
          </div>
        )}
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

export default CafeFormModal;