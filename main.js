REACT_APP_SANITY_PROJECT_ID = "yu1tguzq";
REACT_APP_SANITY_DATASET = "production";
REACT_APP_SANITY_KEY = "skZGcWKz3QVNPsLJRwiPiWqY3132gpszKCJWetryFeAc0BfHIkrlL5hQmDMoWjAlNuiBoTLwvKYg1kyNsCwkdGHqIU18t0WT7D1o8gEBYHnIIdMIAj8gLMzaJwgEQ65ZvXIN52ws8mbnXBZkzhWCemokGVe2DCVzMzLazaYe1V4Pywsy3eQH";

let poems = document.getElementById("poems");

info = fetchInformation();

poetry = info.poems.join("\n");

console.log(poetry);

poems.textContent = poetry;


hughTurn = info.hughTurn

if (hughTurn) {

    let email = info.hughEmail;

} else {

    let email = info.genEmail;

}

function send() {
    
    let input = document.getElementById("poemInput");
    
    let newPoem = input.textContent;

    let mutation = { 
        "mutations": [
          {"patch": {
              "id": "ad12d038-c1e8-4e0a-82a2-76b6d3cbf79b",
              "insert": {
                "after": "poems[-1]",
                "items": [newPoem]
              }
          }}
        ]
      }
    

    mutate(mutation)

    // TO DO ADD EMAIL AND CHECKING FOR WEEK

}

async function fetchFromSanityWithQuery(query) {

    // Compose the URL for your project's endpoint and add the query
    let URL = `https://${REACT_APP_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${REACT_APP_SANITY_DATASET}?query=${query}`;

    console.log(URL);

    // fetch the content
    return await fetch(URL)
    .then((res) => res.json())
    .catch((err) => console.error(err));

}

async function fetchInformation() {

    const { result } = await fetchFromSanityWithQuery("*");

    console.log(result);

    return result[0];

}

export async function mutate(mutations) {
    const result = await fetch(
      `https://${REACT_APP_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${REACT_APP_SANITY_DATASET}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${REACT_APP_SANITY_KEY}`,
        },
        body: JSON.stringify(mutations),
        method: "POST",
      }
    );
  
    const json = await result.json();
    return json;
  }