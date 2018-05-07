
$(document).ready(function() {

  // My initial topics
  var topics = ['Rick and Morty', 'Ugandan Knuckles', 'Candy', 'Money','Gardening'];

  // Loop my topics and create a button for each one of them
  topics.forEach(function(topic) {
    buttonCreator(topic);
  })

  // EVENT LISTENERS EVENT LISTENERS EVENT LISTENERS EVENT LISTENERS EVENT LISTENERS EVENT LISTENERS EVENT LISTENERS

  // Event listener for changing from a still giphy to an animated gipy
    $(document).on('click','.gif',function() {
      var state = $(this).attr('data-state');
 
      if(state === 'still') {
        var animateUrl = $(this).attr('data-animate');
        $(this).attr('src',animateUrl);
        $(this).attr('data-state','animate');
      }

      if(state === 'animate') {
        var stillUrl = $(this).attr('data-still');
        $(this).attr('src',stillUrl);
        $(this).attr('data-state','still');
      }
    })

  // Event Listener for input form to create new buttons
  $("#select-giphy").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the giphy name
    var giphy = $("#giphy-input").val().trim();
    // Create button with the provided value,
    buttonCreator(giphy);
  });


  // Event listener for giphys to make an AJAX call to the Giphy API and fetch the corresponding giphys
  $(document).on('click','.btn',function() {

    // Create information to make requests to Giphy API
    var API_KEY = "Ou02z8M6xcCPpWA7eUbFNvAlGU6EeOkW";
    var url = "https://api.giphy.com/v1/gifs/search";
    var term = $(this).attr('data-term');

    // Use JQuery's param method for serializing an object to something suitable for an ajax request
    url+= '?' + $.param({
      'api_key': API_KEY,
      'q': term,
      'limit': 10,
      'rating': 'g'
    })

    // AJAX request w/ syntactic sugar on the url line. url: url becomes just url.
    //  This is allowed when the key and value share the same name
    $.ajax({
      url,
      method: 'GET',
    }).then(function(response) {
      var responseArray = response.data;
      // Loop over the 10 responses from the response array, and prepend a still-giphy to the giphy-holder
      responseArray.forEach(function(response) {
        $('#giphy-holder').prepend(giphyCreator(response));
      })
    })

  })

  // FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS FUNCTIONS 
  /**
   * Creates a button with a data-term equal to the user input and appends it to the button-holder.
   * The data-term is referenced for AJAX calls, when a user clicks the created button 
   * @param  {string} topic: is the information the user submits in the create giphy form
   */
  function buttonCreator(topic) {
    var newButton = $(`<button type="button" class="btn btn-dark"></button>`);
    // Add text
    newButton.text(topic);
    // Add id
    newButton.attr('id',topic);
    // Store the id as the topic name for the data-term's value
    var buttonTopic = newButton.attr('id');    
    newButton.attr('data-term',buttonTopic);
    // Append newly created button to the button holder
    $('#button-holder').append($(newButton));
  }
  
  /**
   * @param  {Object} response: is the response object return by the AJAX call to the giphy API
   * @returns a div that contains the img and caption overlay information
   */
  function giphyCreator(response) {
    // Create the container for images to have thumbnails
    var thumbNail = $('<div class="thumbnail text-center"></div>');
    // Create the properties for each image
    var id = response.id;
    var still = response.images.fixed_height_still.url
    var animated = response.images.fixed_height.url
    var img = $(`<img src="${still}" data-still="${still}" data-animate="${animated}" data-state="still" class="gif" height=200 width=250>`);
    var rating = response.rating; 
    // Create the caption
    var caption = $(`<div class="caption"><p>Rated: ${rating}</p></div>`)
    // Append the image to the container
    thumbNail.append(img);
    // Append the caption to the container
    thumbNail.append(caption);
    return thumbNail;
  }

})