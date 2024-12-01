export const CAFE_FORM_ONCHANGE_VALIDATOR = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        if (!value) return 'Name is required';
        if (value.length < 6) return 'Name must be at least 6 characters';
        if (value.length > 10) return 'Name must be less than 10 characters';
        return '';
      case 'description':
        if (!value) return 'Description is required';
        if (value.length > 256) return 'Description must be less than 256 characters';
        return '';
      default:
        return '';
    }
  };

export const CAFE_VALIDATE_FORM = (formData) => {
    const newErrors = {};
    if (!formData.name) 
    {
        newErrors.name = 'Name is required';
    }
    else if(formData.name.length < 6)
    {
        newErrors.name = 'Name must be at least 6 characters';
    }
    else if (formData.name.length > 10)
    {
        newErrors.name = 'Name must be less than 10 characters';
    }

    if (formData.description.length > 256) 
    {   
        newErrors.description = 'Description must be less than 256 characters';
    }

    if (!formData.location) newErrors.location = 'Location is required';

    return newErrors;
};

export const EMPLOYEE_VALIDATE_FORM = (formData) => {
    const newErrors = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone number validation
    if (!formData.phone || !/^[89]\d{7}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must start with 8 or 9 and have exactly 8 digits';
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    return newErrors;
    // setErrors(newErrors);
    // return isValid;
  };