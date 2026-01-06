document.addEventListener('DOMContentLoaded', () => {
    // Select all necessary elements
    const calcBtn = document.getElementById('calc-btn');
    const dobInput = document.getElementById('dob');
    const resultBox = document.getElementById('result-box');
    const ageOutput = document.getElementById('age-output');
    const detailOutput = document.getElementById('detail-output');
    const personalNote = document.getElementById('personal-note');

    // Safety check: Ensure elements exist before proceeding
    if (!calcBtn || !dobInput || !resultBox) {
        console.error("Age Calculator: Required HTML elements not found. Please check your IDs in age.html.");
        return;
    }

    // Prevent selecting future dates in the calendar picker
    dobInput.max = new Date().toISOString().split("T")[0];

    // Main calculation function
    calcBtn.addEventListener('click', () => {
        const birthDateValue = dobInput.value;

        if (!birthDateValue) {
            // Using a text message instead of alert for a better experience
            resultBox.classList.remove('hidden');
            ageOutput.innerText = "Error";
            detailOutput.innerText = "Please select a valid date of birth.";
            return;
        }

        const birthDate = new Date(birthDateValue);
        const today = new Date();

        // 1. Initial differences
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        // 2. Adjust Days (Borrow from previous month if days are negative)
        if (days < 0) {
            months--;
            // Get the total days in the month before 'today'
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            days += lastMonth;
        }

        // 3. Adjust Months (Borrow from years if months are negative)
        if (months < 0) {
            years--;
            months += 12;
        }

        // 4. Update the UI
        resultBox.classList.remove('hidden');
        ageOutput.innerText = `${years} Years`;
        detailOutput.innerText = `${months} months and ${days} days old`;

        // 5. Check for special personal dates (Real vs Document)
        handleSpecialDates(birthDateValue, personalNote);
    });

    /**
     * Handles personal messages for Yash's specific dates
     */
    function handleSpecialDates(dateStr, element) {
        if (!element) return;
        
        element.style.display = "none";
        element.style.padding = "10px";
        element.style.marginTop = "15px";
        element.style.borderRadius = "8px";
        element.style.fontSize = "0.9rem";
        
        // Document: 2005-10-02
        // Real: 2004-09-03
        if (dateStr === "2005-10-02") {
            element.innerText = "📄 This is your official document date of birth.";
            element.style.background = "#e3f2fd";
            element.style.color = "#0d47a1";
            element.style.display = "block";
        } else if (dateStr === "2004-09-03") {
            element.innerText = "🎂 This is your real date of birth, Krish!";
            element.style.background = "#e8f5e9";
            element.style.color = "#1b5e20";
            element.style.display = "block";
        }
    }
});