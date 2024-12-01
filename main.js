// url Async requesting function
function httpGetAsync(theUrl, callback)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

// callback for the GIFs
function tenorCallback_search(responsetext)
{
    // parse the json response
    var response_objects = JSON.parse(responsetext);

    rand_gif = response_objects["results"][0]["media"][0]["tinygif"]["url"];
    // var output_img = document.createElement('img');
    // output_img.src = rand_gif[0]["media"][0]["tinygif"]["url"];
    // output_img.alt = rand_gif[0]["content_description"];
    // document.body.appendChild(output_img);
    document.body.style.backgroundImage = "url('"+ rand_gif +"')";

    return;

}


// function to call the trending and category endpoints
function grab_data()
{
    var params = new URLSearchParams(window.location.search);
    var search_term = params.get('q', "technology");
    // set the apikey and limit
    var apikey = "LIVDSRZULELA"; //test value from https://tenor.com/gifapi/documentation
    var lmt = 1;

    // using default locale of en_US
    var search_url = "https://g.tenor.com/v1/random?q=" + search_term + "&key=" +
            apikey + "&limit=" + lmt+"&ar_range=standard&media_filter=minimal";

    httpGetAsync(search_url,tenorCallback_search);

    // data will be loaded by each call's callback
    return;
}


// SUPPORT FUNCTIONS ABOVE
// MAIN BELOW

// start the flow
grab_data();