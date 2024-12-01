const baseApiUrl = 'https://localhost:44371/api';

export const API_GET_LIST = {
    GetCafes: baseApiUrl+'/Cafes',
    GetEmployees: baseApiUrl+'/Employees',
}

export const API_POST_LIST = {
    PostCafe: baseApiUrl+'/Cafes',
    PostEmployee: baseApiUrl+'/Employees',
}

export const API_PUT_LIST = {
    PutCafe: baseApiUrl+'/Cafes',
    PutEmployee: baseApiUrl+'/Employees',
}

export const API_DELETE_LIST = {
    DeleteCafe: baseApiUrl+'/Cafes',
    DeleteEmployee: baseApiUrl+'/Employees',
}

export const TABLE_HEADERS = {
    Cafe: ['Logo', 'Name', 'Description',  'No. Of Employees', 'Location', ''],
    Employee: ['EmployeeID', 'Name', 'Email Address', 'Phone Number', 'Days worked in the café', 'Café Name', '']
}