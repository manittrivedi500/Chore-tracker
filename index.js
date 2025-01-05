let saveBtn = document.getElementById("save-btn")
let inputEl = document.getElementById("input-el")
let inputTime = document.getElementById("input-time")
let choreList = document.getElementById("chore-list")
let deleteAll = document.getElementById("delete-all")

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

    const choreButton = document.createElement("button");
    choreButton.textContent = inputValue;
    choreButton.className = "chore-button";
    
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "Delete";
    
    const deleteContainer = document.createElement("dialog");
    deleteContainer.className = "delete-container";
    
    choreButton.addEventListener("click", function () {
        alert(`you finished the following chore! ${inputValue}`);
        choreButton.style.boxShadow = "-3px 3px #82fba5";
        choreButton.style.textDecoration = "line-through";
    });
    
    deleteBtn.addEventListener("click", function() {
        confirmText.style.display = "block";
        confirmText.style.fontSize = "20px";
        confirmBtn.style.display = "block";
        deleteContainer.showModal()
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
        });
        
        declineBtn.addEventListener("click", function () {
            deleteContainer.close();
        });
    });
    

    choreList.appendChild(choreButton);
    
    choreList.appendChild(deleteBtn);
    
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