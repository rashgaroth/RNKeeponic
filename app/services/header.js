export function HeaderAuth(token) {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    };
}

export function HeaderApiKey(token, key) {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            'api_key': key
        }
    };
}

export function HeaderFile(token) {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            Accept: '*/*'
        }
    };
}

export function Header() {
    return {
        headers: {
            'Content-Type': 'application/json'
        }
    };
}
