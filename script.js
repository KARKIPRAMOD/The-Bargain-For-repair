// Function to fetch and display scenes from a JSON file
async function fetchAndDisplayScenes() {
  try {
    const response = await fetch("script.json"); // Fetch the JSON file
    const data = await response.json(); // Parse the JSON response

    const sceneContainer = document.getElementById("scene-container");
    const sceneList = document.getElementById("scene-list");

    // Loop through each scene in the JSON data
    data.script.forEach((scene, index) => {
      for (const [sceneTitle, sceneDescription] of Object.entries(scene)) {
        // Create the scene element
        const sceneElement = document.createElement("div");
        sceneElement.classList.add("scene");
        sceneElement.id = `scene-${index}`; // Unique ID for each scene

        // Add scene title
        const sceneTitleElement = document.createElement("h2");
        sceneTitleElement.innerText = sceneTitle;
        sceneElement.appendChild(sceneTitleElement);

        // Add scene description
        const sceneDescriptionElement = document.createElement("p");
        sceneDescriptionElement.innerHTML = sceneDescription.join("<br><br>");
        sceneElement.appendChild(sceneDescriptionElement);

        // Append scene to the container
        sceneContainer.appendChild(sceneElement);

        // Create the scene name in the sidebar
        const listItem = document.createElement("li");
        listItem.innerText = sceneTitle;
        listItem.onclick = () => {
          // Smooth scroll to the scene when clicked
          document.getElementById(`scene-${index}`).scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        };

        // Append the scene name to the sidebar
        sceneList.appendChild(listItem);
      }
    });
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

// Toggle between light and dark themes
const themeToggleButton = document.querySelector(".theme-toggle");
const body = document.body;
const themeIcon = document.getElementById("theme-icon");

themeToggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");

  // Change the theme icon based on the current theme
  if (body.classList.contains("dark-theme")) {
    themeIcon.classList.replace("fa-sun", "fa-moon");
  } else {
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }
});

// Sidebar toggle (hamburger menu)
// Select elements
const hamburgerToggle = document.querySelector(".hamburger-toggle");
const sidebar = document.querySelector(".sidebar");

// Toggle the sidebar on click
hamburgerToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open"); // This will add/remove the 'open' class
});

// Initialize the scene display and default theme
fetchAndDisplayScenes();
body.classList.add("light-theme"); // Set default theme as light
