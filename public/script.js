let restServer = "http://twychocki.net:3000/"

function sendGET() 
{
    fetch(restServer,
    {
        method: 'GET'
    })
    .then(res => res.json())
    .then(response => 
        document.getElementById('textbox').value = response.value
    )
    .catch(error => console.error('Error:', error));
}

function sendPOST()
{
    fetch(restServer, 
    {
        method: 'POST',
        body: JSON.stringify({
            "value" : document.getElementById('textbox').value
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}