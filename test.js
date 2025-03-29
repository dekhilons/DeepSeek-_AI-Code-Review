function fetchData(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      processData(data);
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function processData(data) {
  for (let i = 0; i < data.length; i++) {
    console.log("Item:", data[i]);
  }
}
