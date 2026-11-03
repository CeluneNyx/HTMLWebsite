function validateFullname(fullname) {
    if (typeof fullname !== 'string') {
        return false;
    }

    if (Array.from(fullname).length < 2) {
        return false;
    }

    return true;
}

function validateEmail(email) {
    if (typeof email !== 'string') {
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}