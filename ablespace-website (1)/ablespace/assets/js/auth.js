/* AbleSpace — form validation & demo auth handling (client-side only) */

function setFieldValid(fieldEl, isValid) {
  fieldEl.classList.toggle('invalid', !isValid);
}

/* ---------- Login ---------- */
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    const emailValid = /^\S+@\S+\.\S+$/.test(email.value.trim());
    const passValid = password.value.length >= 6;

    setFieldValid(document.getElementById('field-email'), emailValid);
    setFieldValid(document.getElementById('field-password'), passValid);
    if (!emailValid || !passValid) return;

    const name = email.value.split('@')[0];
    window.AbleSpaceAuth.setUser({
      fullName: name.charAt(0).toUpperCase() + name.slice(1),
      email: email.value.trim(),
      conditionCategory: 'general',
      isLoggedIn: true
    });

    document.querySelector('[data-login-success]').classList.add('show');
    loginForm.style.display = 'none';
    setTimeout(() => { window.location.href = 'index.html'; }, 1100);
  });
}

/* ---------- Sign up ---------- */
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name');
    const email = document.getElementById('signup-email');
    const password = document.getElementById('signup-password');
    const confirm = document.getElementById('signup-confirm');
    const category = document.getElementById('signup-category');

    const nameValid = name.value.trim().length > 1;
    const emailValid = /^\S+@\S+\.\S+$/.test(email.value.trim());
    const passValid = password.value.length >= 6;
    const confirmValid = confirm.value === password.value && confirm.value.length > 0;

    setFieldValid(document.getElementById('field-name'), nameValid);
    setFieldValid(document.getElementById('field-email'), emailValid);
    setFieldValid(document.getElementById('field-password'), passValid);
    setFieldValid(document.getElementById('field-confirm'), confirmValid);
    if (!nameValid || !emailValid || !passValid || !confirmValid) return;

    window.AbleSpaceAuth.setUser({
      fullName: name.value.trim(),
      email: email.value.trim(),
      conditionCategory: category.value,
      isLoggedIn: true
    });

    document.querySelector('[data-signup-success]').classList.add('show');
    signupForm.style.display = 'none';
    setTimeout(() => { window.location.href = 'index.html'; }, 1100);
  });
}

/* ---------- Contact ---------- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');

    const nameValid = name.value.trim().length > 1;
    const emailValid = /^\S+@\S+\.\S+$/.test(email.value.trim());
    const msgValid = message.value.trim().length >= 10;

    setFieldValid(document.getElementById('field-name'), nameValid);
    setFieldValid(document.getElementById('field-email'), emailValid);
    setFieldValid(document.getElementById('field-message'), msgValid);
    if (!nameValid || !emailValid || !msgValid) return;

    document.querySelector('[data-contact-success]').classList.add('show');
    contactForm.reset();
  });
}
