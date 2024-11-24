// public/sw.js
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Extract query parameters
  const username = url.searchParams.get("username");
  const password = url.searchParams.get("password");
  const saveData = url.searchParams.get("saveData");
  const isBanned = url.searchParams.get("isBanned");
  const level = url.searchParams.get("level");

  // Check if all parameters are present
  if (username && password && saveData && isBanned && level) {
    const data = {
      Username: username,
      Password: password,
      SaveData: saveData,
      IsBanned: isBanned === "true",
      Level: parseInt(level, 10),
    };

    // Send data to Firebase
    fetch("https://zumix-4aa16-default-rtdb.firebaseio.com/userdata.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data sent successfully:", data);
        } else {
          console.error("Failed to send data to Firebase.");
        }
      })
      .catch((error) => {
        console.error("Error while sending data:", error);
      });
  } else {
    console.warn("Missing query parameters. Fetch request ignored.");
  }

  // Proceed with the original request
  event.respondWith(fetch(event.request));
});
