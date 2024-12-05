function createTrainInfo(id) {
  // Create the container div
  const container = document.createElement("div");
  container.classList.add("item");

  // Create the Destino link
  const destino = document.createElement("a");
  destino.id = `Destino_${id}`;
  destino.textContent = "Destino";
  container.appendChild(destino);
  container.appendChild(document.createElement("br"));

  // Create the Comboio1 and tempoChegada1 links
  const comboio1 = document.createElement("a");
  comboio1.id = `Comboio1_${id}`;
  comboio1.textContent = `Comboio1:`;
  container.appendChild(comboio1);
  container.appendChild(document.createElement("br"));

  const tempoChegada1 = document.createElement("a");
  tempoChegada1.id = `tempoChegada1_${id}`;
  tempoChegada1.textContent = "tempoChegada1";
  container.appendChild(tempoChegada1);
  container.appendChild(document.createElement("br"));

  // Create the Comboio2 and tempoChegada2 links
  const comboio2 = document.createElement("a");
  comboio2.id = `Comboio2_${id}`;
  comboio2.textContent = `Comboio2:`;
  container.appendChild(comboio2);
  container.appendChild(document.createElement("br"));

  const tempoChegada2 = document.createElement("a");
  tempoChegada2.id = `tempoChegada2_${id}`;
  tempoChegada2.textContent = "tempoChegada2";
  container.appendChild(tempoChegada2);
  container.appendChild(document.createElement("br"));

  // Create the Comboio3 and tempoChegada3 links
  const comboio3 = document.createElement("a");
  comboio3.id = `Comboio3_${id}`;
  comboio3.textContent = `Comboio3:`;
  container.appendChild(comboio3);
  container.appendChild(document.createElement("br"));

  const tempoChegada3 = document.createElement("a");
  tempoChegada3.id = `tempoChegada3_${id}`;
  tempoChegada3.textContent = "tempoChegada3";
  container.appendChild(tempoChegada3);
  container.appendChild(document.createElement("br"));

  return container;
}

function createAllTrainInfo(id_container, start_id, end_id) {
  // Create a parent container for all items
  const mainContainer = document.createElement("div");
  mainContainer.classList.add("container");
  mainContainer.id = "container" + id_container;

  // Create and append the items with specific IDs (e.g., 3, 4, etc.)
  if (start_id == end_id && end_id == start_id) {
    const item = createTrainInfo(start_id);
    mainContainer.appendChild(item);
  } else {
    for (let i = start_id; i <= end_id; i++) {
      const item = createTrainInfo(i);
      mainContainer.appendChild(item);
    }
  }

  // Append the main container to the body or a specific element
  document.body.appendChild(mainContainer);
}
function convertSecondsToMinutesAndSeconds(seconds_not_converted) {
  const seconds = Number(seconds_not_converted);
  const minutes = Math.floor(seconds / 60); // Get the number of full minutes
  const remainingSeconds = seconds % 60; // Get the remaining seconds

  return `${minutes}m ${remainingSeconds}s`; // Return the result as a string in the format "Xm Ys"
}
function findNomeDestinoById(id) {
  for (let i = 0; i < metro_destinos.length; i++) {
    if (metro_destinos[i].id_destino == id) {
      return metro_destinos[i].nome_destino;
    }
  }
}
document.getElementById("send").onclick = function (event) {
  const metrostation = document
    .getElementById("metrostation1")
    .value.toUpperCase();

  if (available_metro_stations.includes(metrostation) == false) {
    console.error("METROSTATION DOESNT EXIST");
    return;
  }
  fetch(window.location.origin + "/api/metro/timeforstation", {
    method: "POST", // Set the request method to POST
    headers: {
      "Content-Type": "application/json", // Tell the server that you're sending JSON data
    },
    body: JSON.stringify({
      // Convert the data to a JSON string
      station: metrostation,
    }),
  })
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
      console.log("Success:", data); // Handle the response data
      displaydata(data);
    })
    .catch((error) => {
      console.error("Error:", error); // Handle errors
    });
};

function displaydata(data) {
  if (document.getElementById("container1") != null) {
    document.getElementById("container1").remove();
  }
  if (document.getElementById("container2") != null) {
    document.getElementById("container2").remove();
  }
  const {
    comboio: comboio1_0,
    tempoChegada1: tempoChegada1_0,
    comboio2: comboio2_0,
    tempoChegada2: tempoChegada2_0,
    comboio3: comboio3_0,
    tempoChegada3: tempoChegada3_0,
    destino: destino_0,
  } = data[0];
  let comboio1_1,
    tempoChegada1_1,
    comboio2_1,
    tempoChegada2_1,
    comboio3_1,
    tempoChegada3_1,
    destino_1;
  let comboio1_2,
    tempoChegada1_2,
    comboio2_2,
    tempoChegada2_2,
    comboio3_2,
    tempoChegada3_2,
    destino_2;
  let comboio1_3,
    tempoChegada1_3,
    comboio2_3,
    tempoChegada2_3,
    comboio3_3,
    tempoChegada3_3,
    destino_3;

  if (data.length == 2) {
    ({
      comboio: comboio1_1,
      tempoChegada1: tempoChegada1_1,
      comboio2: comboio2_1,
      tempoChegada2: tempoChegada2_1,
      comboio3: comboio3_1,
      tempoChegada3: tempoChegada3_1,
      destino: destino_1,
    } = data[1]);
  }
  if (data.length == 3) {
    ({
      comboio: comboio1_2,
      tempoChegada1: tempoChegada1_2,
      comboio2: comboio2_2,
      tempoChegada2: tempoChegada2_2,
      comboio3: comboio3_2,
      tempoChegada3: tempoChegada3_2,
      destino: destino_2,
    } = data[2]);
  }
  if (data.length == 4) {
    // Destructuring the objects from data[2] and data[3]

    ({
      comboio: comboio1_3,
      tempoChegada1: tempoChegada1_3,
      comboio2: comboio2_3,
      tempoChegada2: tempoChegada2_3,
      comboio3: comboio3_3,
      tempoChegada3: tempoChegada3_3,
      destino: destino_3,
    } = data[3]);
  }
  //document.getElementById("answer").innerText =convertSecondsToMinutesAndSeconds(Number(tempoChegada2_0));
  //console.log(tempoChegada1_3);
  if (data.length == 4) {
    createAllTrainInfo(1, 0, 1);
    createAllTrainInfo(2, data.length - 2, data.length - 1);
  } else if (data.length == 3) {
    //cais do sodre
    createAllTrainInfo(1, 0, 1);
    createAllTrainInfo(2, 2, 2);
  } else if (data.length == 2) {
    createAllTrainInfo(1, data.length - 2, data.length - 1);
  } else if (data.length == 1) {
    createAllTrainInfo(1, 0, 0);
  }
  document.getElementById("Comboio1_0").innerText = "Comboio:" + comboio1_0;
  document.getElementById("tempoChegada1_0").innerText =
    convertSecondsToMinutesAndSeconds(tempoChegada1_0);
  document.getElementById("Comboio2_0").innerText = "Comboio:" + comboio2_0;
  document.getElementById("tempoChegada2_0").innerText =
    convertSecondsToMinutesAndSeconds(tempoChegada2_0);
  document.getElementById("Comboio3_0").innerText = "Comboio:" + comboio3_0;
  document.getElementById("tempoChegada3_0").innerText =
    convertSecondsToMinutesAndSeconds(tempoChegada3_0);
  document.getElementById("Destino_0").innerText =
    findNomeDestinoById(destino_0);

  if (data.length == 2) {
    document.getElementById("Comboio1_1").innerText = "Comboio:" + comboio1_1;
    document.getElementById("tempoChegada1_1").innerText =
      convertSecondsToMinutesAndSeconds(tempoChegada1_1);
    document.getElementById("Comboio2_1").innerText = "Comboio:" + comboio2_1;
    document.getElementById("tempoChegada2_1").innerText =
      convertSecondsToMinutesAndSeconds(tempoChegada2_1);
    document.getElementById("Comboio3_1").innerText = "Comboio:" + comboio3_1;
    document.getElementById("tempoChegada3_1").innerText =
      convertSecondsToMinutesAndSeconds(tempoChegada3_1);
    document.getElementById("Destino_1").innerText =
      findNomeDestinoById(destino_1);
  }
  if (data.length == 3) {
    document.getElementById("Comboio1_2").innerText = "Comboio:" + comboio1_2;
    document.getElementById("tempoChegada1_2").innerText =
      convertSecondsToMinutesAndSeconds(tempoChegada1_2);
    document.getElementById("Comboio2_2").innerText = "Comboio:" + comboio2_2;
    document.getElementById("tempoChegada2_2").innerText =
      convertSecondsToMinutesAndSeconds(tempoChegada2_2);
    document.getElementById("Comboio3_2").innerText = "Comboio:" + comboio3_2;
    document.getElementById("tempoChegada3_2").innerText =
      convertSecondsToMinutesAndSeconds(tempoChegada3_2);
    document.getElementById("Destino_2").innerText =
      findNomeDestinoById(destino_2);
  }
  if (data.length == 4) {
    document.getElementById("Comboio1_3").innerText = "Comboio:" + comboio1_3;
    document.getElementById("tempoChegada1_3").innerText =
      convertSecondsToMinutesAndSeconds(tempoChegada1_3);
    document.getElementById("Comboio2_3").innerText = "Comboio:" + comboio2_3;
    document.getElementById("tempoChegada2_3").innerText =
      convertSecondsToMinutesAndSeconds(tempoChegada2_3);
    document.getElementById("Comboio3_3").innerText = "Comboio:" + comboio3_3;
    document.getElementById("tempoChegada3_3").innerText =
      convertSecondsToMinutesAndSeconds(tempoChegada3_3);
    document.getElementById("Destino_3").innerText =
      findNomeDestinoById(destino_3);
  }
}