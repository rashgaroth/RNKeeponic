import axios from 'axios';

// For login
export const fetchJSON = (url, options = {}) => {
    return fetch(url, options)
        .then(response => {
            if (!response.status === 200) {
                throw response.json();
            }
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(error => { throw error });
}

// For except login
export function GET(url, header) {
    return axios
        .get(url, header)
        .then(res => {
            return res;
        })
        .catch(err => {
            if (typeof err.response == 'undefined') {
                console.log("Connection not found")
                return { status: 400 };
            } else {
                let errorData = err.response.data || {
                    message: 'Something Went Wrong',
                    trace: ''
                };
                console.log('Error ' + (err.response.status || '') + ':' + errorData.message + ' ' + errorData.trace);
                return err.response;
            }
        });
}

export function POST(url, body, header) {
    return axios
        .post(url, body, header)
        .then(res => {
            return res;
        })
        .catch(err => {
            if (typeof err.response == 'undefined') {
                console.log("Connection not found")
                return { status: 400 };
            } else {
                let errorData = err.response.data || {
                    message: 'Something Went Wrong',
                    trace: ''
                };
                console.log('Error ' + (err.response.status || '') + ':' + errorData.message + ' ' + errorData.trace);
                return err.response;
            }
        });
}

export function PUT(url, body, header) {
    return axios
        .put(url, body)
        .then(res => {
            return res;
        })
        .catch(err => {
            if (typeof err.response == 'undefined') {
                console.log("Connection not found")
                return { status: 400 };
            } else {
                let errorData = err.response.data || {
                    message: 'Something Went Wrong',
                    trace: ''
                };
                console.log('Error ' + (err.response.status || '') + ':' + errorData.message + ' ' + errorData.trace);
                return err.response;
            }
        });
}

export function DELETE(url, header) {
    return axios
        .delete(url)
        .then(res => {
            return res;
        })
        .catch(err => {
            if (typeof err.response == 'undefined') {
                console.log("Connection not found")
                return { status: 400 };
            } else {
                let errorData = err.response.data || {
                    message: 'Something Went Wrong',
                    trace: ''
                };
                console.log('Error ' + (err.response.status || '') + ':' + errorData.message + ' ' + errorData.trace);
                return err.response;
            }
        });
}