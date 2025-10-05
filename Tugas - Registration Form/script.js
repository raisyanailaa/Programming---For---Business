const form = document.getElementById('registrationForm');
const message = document.getElementById('message');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil nilai input
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        birthdate: document.getElementById('birthdate').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value.trim(),
        city: document.getElementById('city').value.trim(),
        postalCode: document.getElementById('postalCode').value.trim(),
        username: document.getElementById('username').value.trim(),
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        terms: document.getElementById('terms').checked
    };
    
    // Reset pesan
    message.className = 'message';
    
    // Validasi Email
    if (!validateEmail(formData.email)) {
        showMessage('Format email tidak valid!', 'error');
        return;
    }
    
    // Validasi Nomor Telepon
    if (!validatePhone(formData.phone)) {
        showMessage('Nomor telepon harus diawali 08 dan 10-13 digit!', 'error');
        return;
    }
    
    // Validasi Umur (minimal 13 tahun)
    if (!validateAge(formData.birthdate)) {
        showMessage('Anda harus berusia minimal 13 tahun!', 'error');
        return;
    }
    
    // Validasi Kode Pos
    if (!validatePostalCode(formData.postalCode)) {
        showMessage('Kode pos harus 5 digit angka!', 'error');
        return;
    }
    
    // Validasi Username
    if (formData.username.length < 4) {
        showMessage('Username minimal 4 karakter!', 'error');
        return;
    }
    
    // Validasi Password
    if (formData.password.length < 6) {
        showMessage('Password minimal 6 karakter!', 'error');
        return;
    }
    
    // Validasi Konfirmasi Password
    if (formData.password !== formData.confirmPassword) {
        showMessage('Password tidak cocok!', 'error');
        return;
    }
    
    // Validasi Terms
    if (!formData.terms) {
        showMessage('Anda harus menyetujui syarat dan ketentuan!', 'error');
        return;
    }
    
    // Jika semua validasi lolos
    console.log('Data Pendaftaran:', formData);
    showMessage(`Registrasi berhasil! Selamat datang, ${formData.firstName} ${formData.lastName}! 🎉`, 'success');
    
    // Reset form
    setTimeout(() => {
        form.reset();
        message.style.display = 'none';
    }, 3000);
});

// Fungsi Validasi Email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Fungsi Validasi Nomor Telepon
function validatePhone(phone) {
    const re = /^08[0-9]{8,11}$/;
    return re.test(phone);
}

// Fungsi Validasi Umur
function validateAge(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age >= 13;
}

// Fungsi Validasi Kode Pos
function validatePostalCode(postalCode) {
    const re = /^[0-9]{5}$/;
    return re.test(postalCode);
}

// Fungsi Tampilkan Pesan
function showMessage(text, type) {
    message.textContent = text;
    message.className = 'message ' + type;
    message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Real-time validation untuk konfirmasi password
document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    
    if (confirmPassword.length > 0) {
        if (password === confirmPassword) {
            this.style.borderColor = '#28a745';
        } else {
            this.style.borderColor = '#dc3545';
        }
    } else {
        this.style.borderColor = '#f5f5dc';
    }
});