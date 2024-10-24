// Function to set the active tab
function setActiveTab(tabId) {
    // Remove 'active' class from all links
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => link.classList.remove('active'));

    // Add 'active' class to the clicked link or the one in view
    const activeLink = document.querySelector(`nav ul li a[href="${tabId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Add event listeners to all links for tab activation
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        setActiveTab(targetId);

        // Check if the link is for navigation to another page
        if (!targetId.startsWith('#')) {
            // This is a link to another HTML file, just allow default behavior
            return; // Stop here as we want to follow the link
        }

        e.preventDefault(); // Prevent default anchor behavior for in-page navigation
        
        // Scroll to the corresponding section
        const section = document.querySelector(targetId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Function to handle scroll events
function handleScroll() {
    var header = document.querySelector('header');
    var scrollThreshold = window.innerHeight * 0.1; // 10% of viewport height

    // Toggle header class based on scroll position
    if (window.scrollY > scrollThreshold) {
        header.classList.add('sticky-header'); // Make header sticky (white)
    } else {
        header.classList.remove('sticky-header'); // Make header transparent
    }

    // Update active tab based on the section in view
    const sections = document.querySelectorAll('section'); // Get all sections
    let currentSectionId = ''; // Variable to store the current section ID

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight * 0.6) {
            currentSectionId = `#${section.id}`; // Get the current section ID
        }
    });

    // Set the active tab for the currently visible section
    if (currentSectionId) {
        setActiveTab(currentSectionId);
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);

    var header = document.querySelector('header');
    // Reset the header to transparent on page load
    header.classList.remove('sticky-header');

    // Trigger the scroll event manually to ensure correct behavior on load
    handleScroll();
});

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Function to search section titles
function searchSections() {
    const queryInput = document.getElementById('searchInput');
    const query = queryInput.value.toLowerCase(); // Get the search query
    const sections = document.querySelectorAll('section'); // Select all sections

    // Check if the input is empty
    if (!query) {
        alert("Please type a word or phrase to search."); // Display a warning if input is empty
        return;
    }

    let found = false; // Variable to track if any section was found

    // Loop through all sections and search for matching titles
    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const sectionTitle = section.querySelector('h1') ? section.querySelector('h1').innerText.toLowerCase() : '';

        // If a match is found, scroll to the section
        if (sectionTitle.includes(query)) {
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
            found = true;
        }
    });

    // If no matching section was found, show an alert
    if (!found) {
        alert("No matching results found!");
    }

    // Clear the input field after the search process is done
    queryInput.value = '';
}

// Event listener for the search icon
document.getElementById('searchIcon').addEventListener('click', searchSections);

// Optionally: Enable pressing Enter to search
document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchSections();
    }
});

// Show the button when scrolled down 100px
window.onscroll = function() {
    let scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Scroll smoothly to the top when the button is clicked
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}



//mobile responsive scripts

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navigationLinks = document.querySelectorAll('nav ul li a'); // Renamed variable

function hideMenu() {
    navMenu.classList.remove('active');
}

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Hide menu when a tab is clicked
navigationLinks.forEach(link => { // Use the renamed variable
    link.addEventListener('click', hideMenu);
});

// Hide menu when clicking outside of the nav menu
window.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        hideMenu();
    }
});




