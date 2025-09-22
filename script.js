
function showPopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    
    // Show elements
    popup.style.display = "flex";
    overlay.style.display = "block";
    
    // Trigger animations after a small delay
    setTimeout(() => {
        popup.classList.add("show");
        overlay.classList.add("show");
    }, 10);
}

function closePopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    
    // Remove animation classes
    popup.classList.remove("show");
    overlay.classList.remove("show");
    
    // Hide elements after animation completes
    setTimeout(() => {
        popup.style.display = "none";
        overlay.style.display = "none";
    }, 300);
}

let userInput = document.getElementById("date");
userInput.max = new Date().toISOString().split("T")[0];

let result = document.getElementById("result")

function countDown() {
    const birthdayInput = document.getElementById("date").value;
    const birthday = new Date(birthdayInput);
    const today = new Date();
    
    // Check if the input is a valid date
    if (isNaN(birthday)) {
        return "Please enter a valid date.";
    }
    
    // Create a copy of the birthday for this year
    const thisYearBirthday = new Date(birthday);
    thisYearBirthday.setFullYear(today.getFullYear());
    
    // If the birthday has already passed this year, calculate for next year
    if (today > thisYearBirthday) {
        thisYearBirthday.setFullYear(today.getFullYear() + 1);
    }

    const timeDifference = thisYearBirthday - today; // Difference in milliseconds
    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days
    
    return daysLeft;
}

function calculateAge() {
    // Check if birth date is entered
    if (!userInput.value) {
        // Show error message instead of popup
        result.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Please enter your birth date first!</h3>
                <p>Select your birth date before calculate your age.</p>
            </div>
        `;
        return; // Exit function early, don't show popup
    }

    // Show loading animation
    result.classList.add("loading");
    result.innerHTML = `
        <div class="loading-text">
            <div class="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            Calculating your age...
        </div>
    `;

    // Simulate calculation delay for better UX
    setTimeout(() => {
        let birthDate = new Date(userInput.value);

        let d1 = birthDate.getDate();
        let m1 = birthDate.getMonth();
        let y1 = birthDate.getFullYear();

        let today = new Date();

        let d2 = today.getDate();
        let m2 = today.getMonth();
        let y2 = today.getFullYear();

        let d3,m3,y3;
        y3 = y2-y1;

        // Logika 
        if(m2 >= m1) {
            m3 = m2 - m1;
        }else {
            y3--;
            m3 = 12 + m2 - m1;
        }; 

        if(d2 >= d1) {
            d3 = d2 - d1; 
        }else{
            m3--;
            d3 = getDayInMonth(y2,m2) + d2 - d1;
        }

        if(m3 < 0){
            m3 = 11;
            y3--;
        }
        
        // Calculate countdown to next birthday
        const daysUntilBirthday = countDown();
        
        // Remove loading class and show result
        result.classList.remove("loading");
        result.innerHTML = `
            <div class="age-result">
                <h3>Today your age is</h3>
                <div class="age-display">
                    <span class="age-number"> <h2>${y3} </h2> year </span>
                    <span class="age-number"> <h2>${m3} </h2> Month</span>
                    <span class="age-number"> <h2>${d3} </h2> days </span>
                </div>
                <div class="countdown-info">
                    <p>🎉 Next birthday in <strong>${daysUntilBirthday}</strong> days!</p>
                </div>
            </div>
        `;
    }, 1500); // 1.5 second delay for loading effect
}

function getDayInMonth(year, month) {
    return new Date(year, month, 0).getDate()
}
