/**
 * USACARDETAILING - BOOKING / CONTACT FORM HANDLING
 * Client-side validation, accessibility announcements, and instant success confirmation.
 */

(function () {
  'use strict';

  const form = document.getElementById('booking-form');
  const successCard = document.getElementById('form-success-card');
  const resetBtn = document.getElementById('reset-form-btn');
  const successCustomerName = document.getElementById('success-customer-name');
  const successVehicle = document.getElementById('success-vehicle');
  const successService = document.getElementById('success-service');
  const dateInput = document.getElementById('preferred-date');

  if (!form) return;

  // Set min date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Field Validators
  const validators = {
    'full-name': (val) => {
      if (!val || val.trim().length < 2) return 'Please enter your full name (at least 2 characters).';
      return null;
    },
    'phone-number': (val) => {
      const phoneRegex = /^(\+?1[-.\s]?)?(\(?\d{3}\)?)[-.\s]?\d{3}[-.\s]?\d{4}$|^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (!val || !phoneRegex.test(val.trim())) return 'Please enter a valid phone number (e.g. 214-555-0198).';
      return null;
    },
    'email-address': (val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val || !emailRegex.test(val.trim())) return 'Please enter a valid email address.';
      return null;
    },
    'vehicle-info': (val) => {
      if (!val || val.trim().length < 3) return 'Please specify your vehicle Year, Make, and Model.';
      return null;
    },
    'service-select': (val) => {
      if (!val || val === '') return 'Please select a detailing package or service.';
      return null;
    },
    'preferred-date': (val) => {
      if (!val) return 'Please choose a preferred service date.';
      return null;
    }
  };

  function validateField(input) {
    const fieldId = input.id;
    const validator = validators[fieldId];
    if (!validator) return true;

    const errorMsg = validator(input.value);
    const formGroup = input.closest('.form-group');
    const errorSpan = formGroup ? formGroup.querySelector('.form-error') : null;

    if (errorMsg) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      if (errorSpan) {
        errorSpan.textContent = errorMsg;
      }
      return false;
    } else {
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      if (errorSpan) {
        errorSpan.textContent = '';
      }
      return true;
    }
  }

  // Realtime validation on blur
  Object.keys(validators).forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur', () => validateField(el));
      el.addEventListener('input', () => {
        if (el.classList.contains('is-invalid')) {
          validateField(el);
        }
      });
    }
  });

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    let firstInvalidInput = null;

    Object.keys(validators).forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const valid = validateField(el);
        if (!valid) {
          isFormValid = false;
          if (!firstInvalidInput) firstInvalidInput = el;
        }
      }
    });

    if (!isFormValid) {
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
      return;
    }

    // Capture values
    const nameEl = document.getElementById('full-name');
    const vehicleEl = document.getElementById('vehicle-info');
    const nameVal = nameEl ? nameEl.value.trim() : '';
    const vehicleVal = vehicleEl ? vehicleEl.value.trim() : '';
    const serviceSelect = document.getElementById('service-select');
    const serviceVal = (serviceSelect && serviceSelect.selectedIndex >= 0)
      ? serviceSelect.options[serviceSelect.selectedIndex].text
      : 'Premium Detail';

    // Display confirmation
    if (successCustomerName) successCustomerName.textContent = nameVal;
    if (successVehicle) successVehicle.textContent = vehicleVal;
    if (successService) successService.textContent = serviceVal;

    // Transition smoothly
    form.style.display = 'none';
    if (successCard) {
      successCard.classList.add('active');
      successCard.setAttribute('tabindex', '-1');
      successCard.focus();
    }
  });

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.querySelectorAll('.form-control').forEach((el) => {
        el.classList.remove('is-invalid');
        el.removeAttribute('aria-invalid');
      });
      form.querySelectorAll('.form-error').forEach((el) => {
        el.textContent = '';
      });
      form.style.display = 'block';
      if (successCard) successCard.classList.remove('active');
      const fullName = document.getElementById('full-name');
      if (fullName) fullName.focus();
    });
  }
})();
