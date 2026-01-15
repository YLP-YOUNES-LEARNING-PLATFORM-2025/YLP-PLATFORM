
// ========================================
// Supabase Integration
// ========================================

// ----------------------------------------
// IMPORTANT: REPLACE THESE WITH YOUR KEYS
// ----------------------------------------
const SUPABASE_URL = 'https://vdumcaftfkrtyqvxkaiv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkdW1jYWZ0ZmtydHlxdnhrYWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0ODgzNDcsImV4cCI6MjA4NDA2NDM0N30.C8oPOYnJUsvk14kGE8DZUUZQKXrL0TTBrkR58a7M58M';

let supabaseClient;

try {
    // Check if the supabase global exists from the CDN
    if (window.supabase && window.supabase.createClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("Supabase initialized via window.supabase");
    } else if (typeof createClient !== 'undefined') {
        supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("Supabase initialized via global createClient");
    } else {
        console.error('CRITICAL ERROR: Supabase SDK not found. Check internet connection.');
    }
} catch (error) {
    console.error('Error initializing Supabase: ' + error.message);
}

document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');

    if (registrationForm) {
        console.log("Form found, attaching listener");
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    } else {
        console.error('Error: Registration form (id="registration-form") not found in HTML.');
    }
});

async function handleRegistrationSubmit(e) {
    e.preventDefault();
    console.log("Form submitted");

    const submitBtn = document.getElementById('submit-btn');
    const originalBtnText = submitBtn.innerHTML;

    // Collect Data
    const formData = {
        parent_name: document.getElementById('parent_name').value,
        parent_phone: document.getElementById('parent_phone').value,
        email: document.getElementById('email').value,
        governorate: document.getElementById('governorate').value,
        student_name: document.getElementById('student_name').value,
        student_age: document.getElementById('student_age').value,
        grade_level: document.getElementById('grade_level').value,
        education_type: document.getElementById('education_type').value,
        school_name: document.getElementById('school_name').value,
        has_laptop: document.getElementById('has_laptop').value === 'true'
    };

    // Validation
    const age = parseInt(formData.student_age, 10);
    if (isNaN(age) || age < 8 || age > 18) {
        alert('عذراً، يجب أن يكون عمر الطالب بين 8 و 18 سنة.');
        return;
    }

    // Remove any non-digit characters to check length
    const phoneDigits = formData.parent_phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
        alert('من فضلك ادخل رقم الهاتف بشكل صحيح');
        return;
    }

    // Show Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'جاري الحجز...';

    try {
        if (!supabaseClient) {
            throw new Error("Supabase client not initialized");
        }

        console.log("Sending data...", formData);

        const { data, error } = await supabaseClient
            .from('registrations')
            .insert([formData])
            .select();

        if (error) {
            console.error("Supabase API Error:", error);
            throw error;
        }

        // Success - Redirect to congratulations page
        window.location.href = 'success.html';

    } catch (error) {
        console.error('Submission Error:', error);
        alert('حدث خطأ: ' + (error.message || JSON.stringify(error)));
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}
