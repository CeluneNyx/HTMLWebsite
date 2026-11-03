
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const topicInput = document.getElementById("topic");
const commentsInput = document.getElementById("comments");
const websiteInput = document.getElementById("website");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackSuccess = document.getElementById("feedbackSuccess");
const commentsCounter = document.getElementById("commentsCounter");

let successTimeout;

function validateFullName() {
    const fullname = nameInput.value.trim();

    if (fullname.length < 2) {
        showFieldError("name", "Please enter your full name");
        return false;
    }

    markFieldValid("name");
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showFieldError("email", "Please enter a valid email address");
        return false;
    }

    markFieldValid("email");
    return true;
}

function validateTopic() {
    if (topicInput.value === "") {
        showFieldError("topic", "Please select a topic");
        return false;
    }

    markFieldValid("topic");
    return true;
}

function validateComments() {
    if (commentsInput.value.trim().length < 15) {
        showFieldError("comments", "Comments must be at least 15 characters long");
        return false;
    }

    markFieldValid("comments");
    return true;
}

function validateURL() {
    const value = websiteInput.value.trim();

    if (value !== "" && !websiteInput.validity.valid) {
        showFieldError("website", "Please enter a valid URL");
        return false;
    }

    if (value === "") {
        clearFieldError("website");
        return true;
    }

    markFieldValid("website");
    return true;
}

function showFieldError(fieldID, message) {
    const field = document.getElementById(fieldID);
    const error = document.getElementById(fieldID + "Error");

    field.classList.add("invalid");
    field.classList.remove("valid");
    error.textContent = message;
    error.style.display = "block";
}

function markFieldValid(fieldID) {
    const field = document.getElementById(fieldID);
    const error = document.getElementById(fieldID + "Error");

    field.classList.remove("invalid");
    field.classList.add("valid");
    error.textContent = "";
    error.style.display = "none";
}

function clearFieldError(fieldID) {
    const field = document.getElementById(fieldID);
    const error = document.getElementById(fieldID + "Error");

    field.classList.remove("invalid");
    field.classList.remove("valid");
    error.textContent = "";
    error.style.display = "none";
}

function resetForm() {
    const fields = ["name", "email", "topic", "comments", "website"];
    fields.forEach(clearFieldError);

    nameInput.value = "";
    emailInput.value = "";
    topicInput.value = "";
    commentsInput.value = "";
    websiteInput.value = "";

    clearTimeout(successTimeout);
    feedbackSuccess.hidden = true;
    updateCommentsCounter();
}

function updateCommentsCounter() {
    const characterCount = commentsInput.value.length;
    commentsCounter.textContent = `${characterCount} characters (15 minimum)`;
    commentsCounter.classList.toggle("below-minimum", characterCount < 15);
    commentsCounter.classList.toggle("meets-minimum", characterCount >= 15);
}

commentsInput.addEventListener("input", updateCommentsCounter);
updateCommentsCounter();

feedbackForm.addEventListener("submit", function(event) {
    event.preventDefault();
    clearTimeout(successTimeout);
    feedbackSuccess.hidden = true;

    const fullname = validateFullName();
    const email = validateEmail();
    const topic = validateTopic();
    const comments = validateComments();
    const url = validateURL();

    if (fullname && email && topic && comments && url) {
        feedbackSuccess.textContent = `Thanks for your feedback, ${nameInput.value.trim()}!`;
        feedbackSuccess.hidden = false;

        nameInput.value = "";
        emailInput.value = "";
        topicInput.value = "";
        commentsInput.value = "";
        websiteInput.value = "";

        const fields = ["name", "email", "topic", "comments", "website"];
        fields.forEach(clearFieldError);
        updateCommentsCounter();

        successTimeout = setTimeout(() => {
            feedbackSuccess.hidden = true;
        }, 4000);
    }
});

feedbackForm.addEventListener("reset", resetForm);
