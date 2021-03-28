export const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/;

    if (!email || email.length <= 0) return 'Email tidak boleh kosong.';
    if (!re.test(email)) return 'Ooops! Email kamu harus valid!';

    return '';
};

export const passwordValidator = (password) => {
    if (!password || password.length <= 0) return 'Password yang kamu masukan tidak boleh kosong!';

    return '';
};

export const nameValidator = (name) => {
    if (!name || name.length <= 0) return 'Name cannot be empty.';

    return '';
};