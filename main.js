REACT_APP_SANITY_PROJECT_ID = "yu1tguzq";
REACT_APP_SANITY_DATASET = "production";
REACT_APP_SANITY_KEY = "skZGcWKz3QVNPsLJRwiPiWqY3132gpszKCJWetryFeAc0BfHIkrlL5hQmDMoWjAlNuiBoTLwvKYg1kyNsCwkdGHqIU18t0WT7D1o8gEBYHnIIdMIAj8gLMzaJwgEQ65ZvXIN52ws8mbnXBZkzhWCemokGVe2DCVzMzLazaYe1V4Pywsy3eQH";

let poems = document.getElementById("poems");
let turn = document.getElementById("turn");
let sendEmailObject = document.getElementById("sendEmail");

let hughTurn;
let curEmail;
let nextEmail;

startUp();

// ADD CHECK TO SEE IF WEEK HAS PASSED

async function startUp() {

    info = await fetchInformation();

    // Get poetry
    poetry = info.poems.join("\n\n");

    poems.textContent = poetry;

    console.log(info);

    // Set up email
    hughTurn = info.hughTurn

    if (hughTurn) {

        turn.textContent = "Hugh's Turn";

        // Says gem instead of gen due to type too lazy to fix
        curEmail = info.hughEmail;
        nextEmail = info.gemEmail;

    } else {

        turn.textContent = "Genesis' Turn";

        // Says gem instead of gen due to type too lazy to fix
        curEmail = info.gemEmail;
        nextEmail = info.hughEmail;

    }

}

async function send() {
    
    let input = document.getElementById("poemInput");
    
    let newPoem = input.value;

    let name;
    if (hughTurn) {

        name = "H";

    } else {

        name = "G";

    }

    let mutation = { 
        "mutations": [
          {"patch": {
              "id": "ad12d038-c1e8-4e0a-82a2-76b6d3cbf79b",
              "insert": {
                "after": "poems[-1]",
                "items": [name + ":\n" + newPoem]
              },
              "set": {
                "hughTurn": !hughTurn
              }
          }}
        ]
      };
    

    await mutate(mutation);

    console.log(nextEmail);

    //await sendEmail(nextEmail);
    sendEmailObject.href = "mailto:" + nextEmail + "?subject=Your Turn for Poetry&body=https://hughmcwjr.github.io/poeticConversation/";
    sendEmailObject.click();

    location.reload();

}

async function sendEmail(email) {

    /*Email.send({
        Host: "smtp.gmail.com",
        Username: "dummypoeticconversation@gmail.com",
        Password: "1237?!23.ALP",
        To: email,
        From: "dummypoeticconversation@gmail.com",
        Subject: "Your Turn for Poetry",
        Body: "https://hughmcwjr.github.io/poeticConversation/",
      })*/

    // REPLACE WITH REST API GOOGLE

    //document.write(" <?php to = '" + email + "'; subject = 'Your Turn for Poetry'; message = 'https://hughmcwjr.github.io/poeticConversation/'; mail($to, $subject, $message, [$headers], [$parameters]);?> ");

}

async function fetchFromSanityWithQuery(query) {

    // Compose the URL for your project's endpoint and add the query
    let URL = `https://${REACT_APP_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${REACT_APP_SANITY_DATASET}?query=${query}`;

    // fetch the content
    return await fetch(URL)
    .then((res) => res.json())
    .catch((err) => console.error(err));

}

async function fetchInformation() {

    const { result } = await fetchFromSanityWithQuery("*");

    return result[0];

}

async function mutate(mutations) {
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