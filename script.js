// =====================================================================
// Mini Assignment 2 - Personal Athletic Page
// This file is loaded with "defer" in the HTML, so it only runs
// after the whole page has been read by the browser.
// =====================================================================

// ===== SECTION 1: DARK MODE =====

// Find the dark mode button in the HTML (by its id) and save it in a variable
const themeButton = document.getElementById("theme-btn");

// Run the function below every time the button is clicked
themeButton.addEventListener("click", function () {
    
    // classList.toggle: if <body> already has the class "dark-mode", remove it.
    // If it does not have it, add it. The CSS uses this class to change the colors.
    document.body.classList.toggle("dark-mode");

    // Check which mode we are in now, so the button text matches
    if (document.body.classList.contains("dark-mode")) {
        // We are in dark mode, so the button offers to go back to light
        themeButton.textContent = "Light mode";
    } else {
        // We are in light mode, so the button offers dark mode
        themeButton.textContent = "Dark mode";
    }
});

// ===== SECTION 2: THE DATA =====

// An array [ ] holds a list of things. Each game is an object { }
// with named properties (date, opponent, score...).
// "result" is either "Win", "Draw" or "Loss" (the filter button use it).
const games = [
    { date: "Oct 28", opponent: "vs Ave Maria", score: "1-1", result: "Draw", conceded: 1, saves: 3},
    { date: "Oct 21", opponent: "@ Florida Memorial", score: "2-1",  result: "Win",  conceded: 1, saves: 3 },
    { date: "Oct 17", opponent: "@ Southeastern",     score: "3-4",  result: "Loss", conceded: 4, saves: 4 },
    { date: "Oct 14", opponent: "vs St Thomas (#10)", score: "1-1",  result: "Draw", conceded: 1, saves: 6 },
    { date: "Oct 9",  opponent: "@ SCAD",             score: "2-2",  result: "Draw", conceded: 2, saves: 4 },
    { date: "Oct 3",  opponent: "@ Webber",           score: "3-2",  result: "Win",  conceded: 2, saves: 4 },
    { date: "Sep 30", opponent: "vs Keiser (#11)",    score: "3-3",  result: "Draw", conceded: 2, saves: 7 },
    { date: "Sep 26", opponent: "vs Warner",          score: "1-1",  result: "Draw", conceded: 1, saves: 2 },
    { date: "Sep 22", opponent: "vs SFBC",            score: "11-0", result: "Win",  conceded: 0, saves: 1 }
];

// ===== SECTION 3: STATE =====

// The "state" object remembers what the visitor has chosen right now.
// Whenever it changes, we call render() to redraw the list.
const state = {
    searchText: "",   // what is typed in the search box (starts empty)
    result: "all"   // which filter button is selected: "all", "Win", "Draw" or "Loss"
};

// ===== SECTION 4: FIND THE HTML ELEMENTS WE NEED =====

const searchInput = document.getElementById("search");   // the search box
const countText = document.getElementById("count");   // the "Shwoing 3 of 8" paragraph
const gameList = document.getElementById("game-list");   // the empty <ul> we fill
const filterButtons = document.querySelectorAll(".filter-btn"); // all the filter buttons

// ===== SECTION 5: render() BUILDS THE LIST =====

// render() draws the list using whatever is in "state".
// We call it once at the start and again after every change.
function render() {

    // 1) Empty the list first, so we do not add games on top of old ones
    gameList.textContent = "";

    // 2) A counter for how many games match the search and filter
    let shownCount = 0;

    // 3) Go through the games one by one ("game" is the current one)
    for (const game of games) {

        // Does the opponent name contain the search text?
        // toLowerCase() makes both lowercase so "scad" matches "SCAD".
        const matchesSearch = game.opponent.toLowerCase().includes(state.searchText.toLowerCase());

        // Does the game match the selected button?
        // It matches if "All" is selected OR the game's result is the one selected.
        const matchesResult = state.result === "all" || game.result === state.result;

        // Only show the game if BOTH are true
        if (matchesSearch && matchesResult) {
            // Create a new <li> element (it is not on the page yet)
            const item = document.createElement("li");

            // Only show the text inside the <li>
            item.textContent = game.date + ": " + game.opponent + ", " + game.score + " (" + game.result + "), Saves: " + game.saves + ", GC: " + game.conceded;
    
            // Add the <li> to the <ul> so it appears on the page
            gameList.appendChild(item);

            // Add 1 to the counter
            shownCount = shownCount + 1;
        }
    }

    // 4) Show the count, for example "Showing 3 of 8"
    countText.textContent = "Showing " + shownCount + " of " + games.length;

    // 5) Highlight the selected filter button and un-highlight the others
    for (const button of filterButtons) {
        // button.dataset.result reads the data-result="..." attribute from the HTML
        if (button.dataset.result === state.result) {
        button.classList.add("active");
        } else {
        button.classList.remove("active");
        }
    }
}

// ===== SECTION 6: SEARCH BOX =====

// The "input" event fires every time the visitor types or deletes a letter
searchInput.addEventListener("input", function () {
    // Save what is typed into the state
    state.searchText = searchInput.value;
    // Redraw the list with the new search text
    render();
});

// ===== SECTION 7: FILTER BUTTONS (my extra feature) =====

// Add a click listener to each filter button
for (const button of filterButtons) {
    button.addEventListener("click", function () {
        // Save which button was clicked
        state.result = button.dataset.result;
        // Redraw the list
        render();
    });
}

// ===== SECTION 8: CONTACT FORM =====

// Find the form and the things inside it
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const formError = document.getElementById("form-error");     // where the error text goes
const formSummary = document.getElementById("form-summary"); // where the success summary goes

// The submit event fires when the visitor clicks Send
contactForm.addEventListener("submit", function (event) {

    // Stop the browser from reloading the page (its default behavior)
    event.preventDefault();

    // Read what the visitor typed. trim() removes spaces at the start and end,
    // so that a name made only of spaces counts as empty.
    const nameValue = nameInput.value.trim();
    const messageValue = messageInput.value.trim();

    // Check 1: the name must not be empty
    if (nameValue === "") {
        formError.textContent = "Please enter your name.";
        formSummary.textContent = "";   // clear any old summary
        return;   // stop here
    }

    // Check 2: the message must have at least 10 characters
    if (messageValue.length < 10) {
        formError.textContent = "Your message must be at least 10 characters long.";
        formSummary.textContent = "";
        return;
    }

    // If we get here, both checks passed, so the input is valid:
    // clear the error and show a summary on the page
    formError.textContent = "";
    formSummary.textContent = "Thanks, " + nameValue + "! Your message: " + messageValue;
});

// ===== SECTION 9: FIRST DRAW =====

// Draw the list once when the page loads (all 9 games, "Showing 9 of 9")
render();
