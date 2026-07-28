// Konfigurasi URL Google Apps Script Web App
const GAS_URL = "https://script.google.com/macros/s/AKfycbw3o59B6r_rccj6TQnfIgK1DvlBrYTO-31Ka5jPCHWCRGVu4h8XMPaimLastvgnVgCE/exec";

// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = document.getElementById('loginUser').value;
        const pass = document.getElementById('loginPass').value;
        const submitBtn = e.target.querySelector('button');

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Memeriksa Akun...';

        try {
            const response = await fetch(GAS_URL + "?action=login&user=" + encodeURIComponent(user) + "&pass=" + encodeURIComponent(pass));
            const result = await response.json();

            if (result.status === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Berhasil',
                    text: 'Selamat datang di Sistem PKKM MAN 1 Soppeng, ' + result.data.name,
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: { popup: 'rounded-2xl' }
                }).then(() => {
                    localStorage.setItem('user', JSON.stringify(result.data));
                    if (result.data.role === 'admin' || result.data.role === 'penilai') {
                        window.location.href = 'admin';
                    } else {
                        window.location.href = 'dashboard';
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                    text: result.message,
                    confirmButtonColor: '#059669',
                    customClass: { popup: 'rounded-2xl' }
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Kesalahan Koneksi',
                text: 'Gagal terhubung ke server Google Apps Script. Periksa koneksi internet Anda.',
                confirmButtonColor: '#059669',
                customClass: { popup: 'rounded-2xl' }
            });
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'MASUK SISTEM';
        }
    });
}

// Handle Register
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const user = document.getElementById('regUser').value;
        const pass = document.getElementById('regPass').value;
        const role = document.getElementById('regRole').value;
        const submitBtn = e.target.querySelector('button');

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Mendaftarkan Akun...';

        try {
            const formData = new URLSearchParams();
            formData.append('action', 'register');
            formData.append('name', name);
            formData.append('user', user);
            formData.append('pass', pass);
            formData.append('role', role);

            const response = await fetch(GAS_URL, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (result.status === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Pendaftaran Berhasil',
                    text: 'Akun Tim PKKM telah terdaftar. Silakan masuk.',
                    confirmButtonColor: '#059669',
                    customClass: { popup: 'rounded-2xl' }
                }).then(() => {
                    toggleAuth(true);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Pendaftaran Gagal',
                    text: result.message,
                    confirmButtonColor: '#059669',
                    customClass: { popup: 'rounded-2xl' }
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Kesalahan Sistem',
                text: 'Terjadi kesalahan koneksi saat mendaftarkan akun.',
                confirmButtonColor: '#059669',
                customClass: { popup: 'rounded-2xl' }
            });
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'DAFTAR AKUN TIM';
        }
    });
}

// Global Logout Function
function logout() {
    Swal.fire({
        title: 'Keluar dari Sesi PKKM?',
        text: "Anda akan keluar dari portal sistem informasi PKKM MAN 1 Soppeng.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#059669',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Ya, Keluar!',
        cancelButtonText: 'Batal',
        customClass: { popup: 'rounded-2xl' }
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('user');
            window.location.href = 'index';
        }
    });
}