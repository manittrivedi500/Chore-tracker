let saveBtn = document.getElementById("save-btn");
let inputEl = document.getElementById("input-el");
let inputTime = document.getElementById("input-time");
let choreList = document.getElementById("chore-list");
let deleteAll = document.getElementById("delete-all");
let timeList = document.getElementById("time-list")

timeList.style.display = "none";


deleteAll.addEventListener("dblclick", function() {
    choreList.innerHTML = ""
});

saveBtn.addEventListener("click", function () {
    
    const confirmText = document.createElement("p")
    confirmText.style.display = "none"
    confirmText.innerHTML = "Do you want to delete this event?";
    confirmText.className = "confirm-text";
    
    const confirmBtn = document.createElement("button");
    confirmBtn.style.display = "none";
    confirmBtn.className = "confirm-btn";
    
    const declineBtn = document.createElement("button");
    declineBtn.style.display = "none";
    declineBtn.className = "decline-btn";
    
    const inputValue = inputEl.value + ": " + inputTime.value;
    
    
    if (inputEl.value.trim() === "") {
        alert("Please enter a chore!");
        return;
    }
    
    if (inputTime.value.trim() === "") {
        alert("Please enter a time!");
        return;
    }

    const choreButton = document.createElement("p");
    choreButton.textContent = inputValue;
    choreButton.className = "chore-button";
    
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "Delete";

    const finishBtn = document.createElement("button");
    finishBtn.className = "finish-btn";
    finishBtn.innerHTML = "Start Chore?";
    
    const deleteContainer = document.createElement("dialog");
    deleteContainer.className = "delete-container";

    let first_click = true;
    const dateTime = document.createElement("p");

    finishBtn.addEventListener("click", function() {
        if (first_click) {
            const now1 = new Date();
            const currentDateTime1 = now1;
            timeList.style.display = "block";
            finishBtn.innerHTML = "Chore Started, Click to Finish";
            first_click = false;
            dateTime.innerHTML = "The chore " + inputValue + " was started on " + now1;
            choreButton.style.backgroundColor = "#FFD54F"
        } else {
            const now2 = new Date();
            const currentDateTime2 = now2;
            dateTime.innerHTML = "The chore " + inputValue + " was finshed on " + now2;
            choreButton.style.backgroundColor = "#A5D6A7"
            deleteBtn.innerHTML = "Remove";
            confirmText.innerHTML = "Are you sure you want to remove this event?";
            finishBtn.remove();
        }
    });

    
    deleteBtn.addEventListener("click", function() {
        confirmText.style.display = "block";
        confirmText.style.fontSize = "20px";
        confirmBtn.style.display = "block";
        deleteContainer.showModal();
        confirmBtn.innerHTML = "Yes";
        declineBtn.style.display = "block";
        declineBtn.innerHTML = "No";


        
        confirmBtn.addEventListener("click", function() { 
            choreButton.remove();
            deleteBtn.remove();
            confirmBtn.remove();
            declineBtn.remove();
            confirmText.remove();
            deleteContainer.close();
            finishBtn.remove();
        });
        
        declineBtn.addEventListener("click", function () {
            deleteContainer.close();
        });
    });
    

    choreList.appendChild(choreButton);
    
    choreList.appendChild(deleteBtn);

    choreList.appendChild(finishBtn);

    timeList.appendChild(dateTime);
    
    deleteContainer.appendChild(confirmBtn);
    
    deleteContainer.appendChild(declineBtn);
    
    deleteContainer.appendChild(confirmText);
    
    choreList.appendChild(deleteContainer);





    inputEl.value = "";
    inputTime.value = "";
    

    function extractDateFromButton() {
        
        const buttonText = choreButton.textContent;

        const datePattern = /.*?(\d{4})[-/](\d{1,2})[-/](\d{1,2}).*/;
        const match = buttonText.match(datePattern);
        if (match) {
            const targetDate = new Date(match[1], match[2] - 1, match[3]);
            return targetDate;
        } else {
            console.error("No valid date found in button text.");
            return null;
        }
    }

    const targetDate = extractDateFromButton();

    if (targetDate) {
        const currentDate = new Date();
        if (targetDate < currentDate) {
            choreButton.style.backgroundColor = 'gray';
        } else {
        }
    }
});