
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

function validateTopic() {

    const topic = document.getElementById("topic");

    if(topic.value === ""){
        return false;
    }

    return true;
}

function validateComments() {
    const comments = document.getElementById("comments");
    if(comments.value.length < 15){
        return false;
    }
    return true;
}

function showFieldError(fieldID, message) {
    const field = document.getElementById(fieldID);
    const error = document.getElementById(fieldID + "Error");
    
    field.classList.add("invalid");
    error.textContent = message;
    error.style.display = "block";
}

function clearFieldError(fieldID) {
    const field = document.getElementById(fieldID);
    const error = document.getElementById(fieldID + "Error");

    field.classList.remove("invalid");
    error.style.display = "none";
}