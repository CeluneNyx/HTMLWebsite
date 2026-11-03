function validateFullname(fullname) {
    if (typeof fullname !== 'string') {
        return false;
    }

    if (Array.from(fullname).length < 2) {
        return false;
    }

    return true;
}
