document.addEventListener("DOMContentLoaded", async () => {
  const memberContainer = document.getElementById("memberContainer");
  const toggleViewButton = document.getElementById("toggleView");
  const spotlightsContainer = document.getElementById("spotlights-container");
  let members = [];

  async function getSpotlightData() {
      try {
          const response = await fetch('data/members.json'); // Ensure the path is correct
          if (!response.ok) throw new Error("Failed to load members.json");

          const data = await response.json();
          members = Array.isArray(data) ? data : data.members; // Store members globally

          displaySpotlights(members);
          renderMembers(members, "grid-view"); // Default view on load
      } catch (error) {
          console.error("Load error:", error);
      }
  }

  function getRandomMembers(members, count) {
      const eligibleMembers = members.filter(member => member.membershipLevel >= 2);
      return eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  function displaySpotlights(members) {
      if (!spotlightsContainer) {
          console.error("Spotlights container not found!");
          return;
      }
      spotlightsContainer.innerHTML = ""; // 🚀 *Fix: Clears previous spotlights before adding new ones*

      const spotlightMembers = getRandomMembers(members, 3);

      spotlightMembers.forEach(member => {
          let spotlight = document.createElement("section");
          spotlight.className = "spotlight-card";

          let membershipTitle = member.membershipLevel === 3 ? "Gold" : "Silver";

          spotlight.innerHTML = `
              <div class="spotlight-content">
                  <h4>${member.name}</h4>
                  <img src="images/${member.image}" alt="${member.name} logo" width="150">
                  <p>${member.address}</p>
                  <p>${member.phone}</p>
                  <p class="membership">${membershipTitle} Member</p>
                  <p class="link">Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
              </div>
          `;
          spotlightsContainer.appendChild(spotlight);
      });
  }

  function renderMembers(members, view) {
      if (!memberContainer) {
          console.error("Member container not found!");
          return;
      }
      memberContainer.innerHTML = "";

      members.forEach(member => {
          const card = document.createElement("div");
          card.className = `member-card ${view}`;
          card.innerHTML = `
              <img src="images/${member.image}" alt="${member.name}" class="logo" onError="this.src='images/default.jpg'">
              <h2>${member.name}</h2>
              <p>${member.address}</p>
              <p>${member.phone}</p>
              <a href="${member.website}" target="_blank">Visit Website</a>
          `;
          memberContainer.appendChild(card);
      });
  }

  // Toggle view event listener
  if (toggleViewButton && memberContainer) {
      toggleViewButton.addEventListener("click", () => {
          const currentView = memberContainer.classList.contains("list-view") ? "list-view" : "grid-view";
          const newView = currentView === "list-view" ? "grid-view" : "list-view";
          memberContainer.classList.remove(currentView);
          memberContainer.classList.add(newView);
          renderMembers(members, newView);
      });
  }

  // Hamburger menu toggle for mobile navigation
  const hamburger = document.querySelector(".hamburger-menu"); // Fixed class name
  const mobileNav = document.querySelector(".nav-links"); // Use nav-links for mobile menu

  if (hamburger && mobileNav) {
      hamburger.addEventListener("click", () => {
          mobileNav.classList.toggle("open");
          mobileNav.classList.toggle("hidden");
      });
  }

  // Set footer year
  const currentYear = document.getElementById("currentYear");
  if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
  }

  // Set last modified date
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
      lastModifiedElement.textContent = document.lastModified;
  }

  // Load member data
  getSpotlightData();
});

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------
    // 1. Hamburger Menu Functionality
    // ----------------------------
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");
  
    hamburger.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
      mobileNav.classList.toggle("hidden");
    });
  
   // ----------------------------
    // 2. Weather and Forecast API
    // ----------------------------
    const apiKey = "7628821d2985129f91ea402d5e5ef0d2";
    const city = "Buenos Aires";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  
    // Fetch current weather
    fetch(weatherUrl)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById(
          "weather-description"
        ).textContent = `Weather: ${data.weather[0].description.replace(
          /\b\w/g,
          (char) => char.toUpperCase()
        )}`;
        document.getElementById(
          "temperature"
        ).textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
      });
  
    // Fetch 3-day forecast
    fetch(forecastUrl)
      .then((response) => response.json())
      .then((data) => {
        let forecastHTML = "";
        for (let i = 0; i < 3; i++) {
          forecastHTML += `
            <div>
              <p>${new Date(data.list[i].dt * 1000).toLocaleDateString()}</p>
              <p>Temp: ${Math.round(data.list[i].main.temp)}°C</p>
            </div>
          `;
        }
        document.getElementById("forecast").innerHTML = forecastHTML;
      });
  
    // ----------------------------
    // 3. Spotlight Members (Gold/Silver Members)
    // ----------------------------
    fetch("data/members.json")
      .then((response) => response.json())
      .then((members) => {
        const spotlightContainer = document.getElementById("spotlight-container");
        const spotlightMembers = members.filter(
          (member) => member.membershipLevel === 2 || member.membershipLevel === 3
        );
        spotlightMembers.sort(() => Math.random() - 0.5);
  
        spotlightMembers.slice(0, 3).forEach((member) => {
          const memberCard = document.createElement("div");
          memberCard.classList.add("member-card");
          memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p>Phone: ${member.phone}</p>
            <p>Address: ${member.address}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p>Membership Level: ${member.membershipLevel === 2 ? "Silver" : "Gold"}</p>
          `;
          spotlightContainer.appendChild(memberCard);
        });
      });
  
    // ----------------------------
    // 4. Directory View Toggle (List/Grid)
    // ----------------------------
    const memberContainer = document.getElementById("memberContainer");
    const toggleViewButton = document.getElementById("toggleView");
  
    if (memberContainer && toggleViewButton) {
      fetch("data/members.json")
        .then((response) => response.json())
        .then((members) => {
          renderMembers(members, "list-view");
  
          // Toggle view event listener
          toggleViewButton.addEventListener("click", () => {
            const currentView = memberContainer.classList.contains("list-view")
              ? "list-view"
              : "grid-view";
            const newView = currentView === "list-view" ? "grid-view" : "list-view";
            memberContainer.classList.remove(currentView);
            memberContainer.classList.add(newView);
            renderMembers(members, newView);
          });
        });
  
      // Function to render members
      function renderMembers(members, view) {
        memberContainer.innerHTML = "";
        members.forEach((member) => {
          const card = document.createElement("div");
          card.className = `member-card ${view}`;
          card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" class="logo">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
          `;
          memberContainer.appendChild(card);
        });
      }
    }
  
    // ----------------------------
    // 5. Form Timestamp and Footer Date
    // ----------------------------
    // Set timestamp value for the form
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
      timestampField.value = new Date().toISOString();
    }
  
    // Set dynamic footer date
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
  
    // ----------------------------
    // 6. Modal Close Functionality
    // ----------------------------
    document.querySelectorAll(".close-modal").forEach((button) => {
      button.addEventListener("click", () => {
        button.closest(".modal").style.display = "none";
      });
    });
  
    // ----------------------------
    // 7. Thank You Page: Display Submitted Data
    // ----------------------------
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.toString()) {
      document.getElementById("display-first-name").textContent =
        urlParams.get("first-name");
      document.getElementById("display-last-name").textContent =
        urlParams.get("last-name");
      document.getElementById("display-email").textContent =
        urlParams.get("email");
      document.getElementById("display-phone").textContent =
        urlParams.get("phone");
      document.getElementById("display-business-name").textContent =
        urlParams.get("business-name");
      document.getElementById("display-timestamp").textContent =
        urlParams.get("timestamp");
    }
  });
    // Set footer year
    const currentYear = document.getElementById("currentYear");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
  
    // Set last modified date
    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
