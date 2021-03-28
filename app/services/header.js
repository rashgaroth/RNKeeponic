export function HeaderAuth(token) {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
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
