document.addEventListener("DOMContentLoaded", async () => {
  const memberContainer = document.getElementById("memberContainer");
  const toggleViewButton = document.getElementById("toggleView");

  // Fetch members.json and populate the directory using async/await
  async function fetchMembers() {
      try {
          const response = await fetch("data/members.json");
          const members = await response.json();
          renderMembers(members, "list-view");

          // Toggle view event listener
          toggleViewButton.addEventListener("click", () => {
              const currentView = memberContainer.classList.contains("list-view") ? "list-view" : "grid-view";
              const newView = currentView === "list-view" ? "grid-view" : "list-view";
              memberContainer.classList.remove(currentView);
              memberContainer.classList.add(newView);
              renderMembers(members, newView);
          });
      } catch (error) {
          console.error("Error fetching members:", error);
      }
  }

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

  // Call the function to fetch members
  await fetchMembers();

  // Set footer info
  document.getElementById("currentYear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  // Hamburger menu functionality
  const menuButton = document.getElementById("menuButton");
  const navMenu = document.getElementById("navMenu");

  if (menuButton && navMenu) {
      menuButton.addEventListener("click", () => {
          navMenu.classList.toggle("show");
      });
  }
});
