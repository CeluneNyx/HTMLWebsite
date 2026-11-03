
function validateFullname() {
    const fullname = document.getElementById("name").value.trim();

    if (fullname.length < 2) {
        showFieldError("name", "Please enter your full name");
        return false;
    }

    clearFieldError("name");
    return true;
}

function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showFieldError("email", "Please enter a valid email address");
        return false;
    }

    clearFieldError("email");
    return true;
}

function validateTopic() {

    const topic = document.getElementById("topic");

    if(topic.value === ""){
        showFieldError("topic", "Please select a topic");
        return false;
    }

    clearFieldError("topic");
    return true;
}

function validateComments() {
    const comments = document.getElementById("comments");
    if(comments.value.trim().length < 15){
        showFieldError("comments", "Comments must be at least 15 characters long");
        return false;
    }

    clearFieldError("comments");
    return true;
}

function validateURL() {
    const website = document.getElementById("website");
    const value = website.value.trim();

    if (value !== "" && !website.validity.valid) {
        showFieldError("website", "Please enter a valid URL");
        return false;
    } else {
        clearFieldError("website");
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

function resetForm() {
    const fields = ["name", "email", "topic", "comments", "website"];
    fields.forEach(fieldID => {
        clearFieldError(fieldID);
    });
    clearTimeout(successTimeout);
    document.getElementById("feedbackSuccess").hidden = true;
}

let successTimeout;

document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const successMessage = document.getElementById("feedbackSuccess");
    clearTimeout(successTimeout);
    successMessage.hidden = true;

    const fullname = validateFullname();
    const email = validateEmail();
    const topic = validateTopic();
    const comments = validateComments();
    const url = validateURL();

    if(fullname && email && topic && comments && url) {
        resetForm();
        successMessage.hidden = false;
        successTimeout = setTimeout(() => {
            successMessage.hidden = true;
        }, 4000);
    }
});

document.getElementById("feedbackForm").addEventListener("reset", resetForm);
