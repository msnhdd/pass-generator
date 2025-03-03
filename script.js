// DOM Elements
const passwordOutput = document.getElementById('password-output');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const lowercaseCheckbox = document.getElementById('lowercase');
const uppercaseCheckbox = document.getElementById('uppercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const excludeDuplicateCheckbox = document.getElementById('exclude-duplicate');
const includeSpacesCheckbox = document.getElementById('include-spaces');
const passwordLengthInput = document.getElementById('password-length');
const lengthValueDisplay = document.getElementById('length-value');

// Character Sets
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+[]{}|;:,.<>?';

// Update the displayed length value when the slider changes
passwordLengthInput.addEventListener('input', () => {
  lengthValueDisplay.textContent = passwordLengthInput.value;
});

// Copy Password to Clipboard
copyBtn.addEventListener('click', () => {
  if (passwordOutput.value) {
    navigator.clipboard.writeText(passwordOutput.value).then(() => {
      alert('Password copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy password:', err);
    });
  }
});

// Generate Password
generateBtn.addEventListener('click', () => {
  let characterSet = '';
  let password = '';

  // Build Character Set Based on Selected Options
  if (lowercaseCheckbox.checked) characterSet += LOWERCASE;
  if (uppercaseCheckbox.checked) characterSet += UPPERCASE;
  if (numbersCheckbox.checked) characterSet += NUMBERS;
  if (symbolsCheckbox.checked) characterSet += SYMBOLS;
  if (includeSpacesCheckbox.checked) characterSet += ' ';

  // Validate Character Set
  if (!characterSet) {
    alert('Please select at least one character type.');
    return;
  }

  // Get Password Length from Range Input
  const length = parseInt(passwordLengthInput.value);

  // Generate Password
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    const char = characterSet[randomIndex];

    // Exclude Duplicates if Option is Checked
    if (excludeDuplicateCheckbox.checked && password.includes(char)) {
      i--; // Retry this iteration
      continue;
    }

    password += char;
  }

  // Update Password Output
  passwordOutput.value = password;
});