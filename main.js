REACT_APP_SANITY_PROJECT_ID = "yu1tguzq";
REACT_APP_SANITY_DATASET = "production";
REACT_APP_SANITY_KEY = "";

let poems = document.getElementById("poems");

poems.textContent = String.toString(fetchInformation())

function send() {
    
    let input = document.getElementById("poemInput");
    // TO DO

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