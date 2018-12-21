const restServer = "https://twychocki.net:3000"
const server = "https://twychocki.org"

function getValue()
{
    sendGET(restServer).then(json => 
        document.getElementById('textbox').value = json.value
    );
}

function setValue()
{
    sendPOST(restServer, JSON.stringify(
    {
        "value" : document.getElementById('textbox').value
    }));
}

function restGET()
{
    sendGET(server + "/rest").then(json => 
        document.getElementById('textbox').value = json.value
    );
}

function restPOST()
{
    sendPOST(server + "/rest", JSON.stringify(
    {
        "value" : document.getElementById('textbox').value
    }));
}

function jwtGET()
{
    sendGET(server + "/restjwt").then(json => 
        document.getElementById('textbox').value = json.value
    );
}

function jwtPOST()
{
    sendPOST(server + "/restjwt", JSON.stringify(
    {
        "value" : document.getElementById('textbox').value
    }));
}

async function sendGET(url) 
{
    let promise = await fetch(url,
                {
                    method: 'GET'
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error));

    return promise;
}

function sendPOST(url, body)
{
    fetch(url, 
    {
        method: 'POST',
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}