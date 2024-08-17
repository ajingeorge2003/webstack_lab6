document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const dobInput = document.getElementById('dob');
    const submitBtn = document.getElementById('submitBtn');
    const loadingElement = document.getElementById('loading');

    function validateName() {
        const nameValue = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        const nameRegex = /^[A-Za-z\s]{3,}$/;

        if (!nameRegex.test(nameValue)) {
            nameInput.classList.add('invalid');
            nameError.textContent = "Name must be at least 3 alphabetic characters.";
            return false;
        } else {
            nameInput.classList.remove('invalid');
            nameInput.classList.add('valid');
            nameError.textContent = "";
            return true;
        }
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(emailValue)) {
            emailInput.classList.add('invalid');
            emailError.textContent = "Please enter a valid email address.";
            return false;
        } else {
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
            emailError.textContent = "";
            return true;
        }
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();
        const passwordError = document.getElementById('passwordError');
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

        if (!passwordRegex.test(passwordValue)) {
            passwordInput.classList.add('invalid');
            passwordError.textContent = "Password must be at least 8 characters long and contain both letters, numbers, and a special character.";
            return false;
        } else {
            passwordInput.classList.remove('invalid');
            passwordInput.classList.add('valid');
            passwordError.textContent = "";
            return true;
        }
    }

    function validateConfirmPassword() {
        const confirmPasswordValue = confirmPasswordInput.value.trim();
        const confirmPasswordError = document.getElementById('confirmPasswordError');

        if (confirmPasswordValue !== passwordInput.value.trim()) {
            confirmPasswordInput.classList.add('invalid');
            confirmPasswordError.textContent = "Passwords do not match.";
            return false;
        } else {
            confirmPasswordInput.classList.remove('invalid');
            confirmPasswordInput.classList.add('valid');
            confirmPasswordError.textContent = "";
            return true;
        }
    }

    function validateDOB() {
        const dobValue = dobInput.value;
        const dobError = document.getElementById('dobError');

        if (!dobValue) {
            dobInput.classList.add('invalid');
            dobError.textContent = "Please enter your date of birth.";
            return false;
        }

        const userAge = calculateAge(new Date(dobValue));

        if (isNaN(userAge) || userAge < 18) {
            dobInput.classList.add('invalid');
            dobError.textContent = "You must be at least 18 years old.";
            return false;
        } else {
            dobInput.classList.remove('invalid');
            dobInput.classList.add('valid');
            dobError.textContent = "";
            return true;
        }
    }

    function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function showLoadingAnimation() {
        loadingElement.style.display = 'flex';
    }

    function hideLoadingAnimation() {
        loadingElement.style.display = 'none';
    }

    function validateForm(event) {
        event.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isDOBValid = validateDOB();

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isDOBValid) {
            showLoadingAnimation();
            
            setTimeout(function() {
                hideLoadingAnimation();
                window.location.href = "success.html";
            }, 2000);
        } else {
            alert('Please fix the errors in the form before submitting.');
        }
    }

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    dobInput.addEventListener('input', validateDOB);

    document.getElementById('registrationForm').addEventListener('submit', validateForm);
});
