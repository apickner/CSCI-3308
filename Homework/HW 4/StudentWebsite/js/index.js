$(document).ready(function() {
    var colors = ['#808080', '#6495ED', '#7FFFD4', '#0000FF', '#008B8B', '#00BFFF', '#F08080', '#CD5C5C', '#8B0000', '#B22222', '#FF0000'];

    var apiKey = '705ce050a89fd6baf46fba4206608c78' // Enter your API Key here
    // console.log(`state_info is: ${state_info}`) // Notice the templating here, use that when you form your url
    // console.log(`apiKey is: ${apiKey}`) // Notice the templating here, use that when you form your url

    // TODO
    // Iterate over the state_info array and call the api for each state_name to get the current temperature
    // Example to call the api using state_name
    // This should be done inside the for loop
    var lat;
    var lng;
    var url;
    for (var key in state_info) {
      if (state_info.hasOwnProperty(key)) {
        lat = state_info[key].lat;
        lng = state_info[key].lng;
        url = `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`;

        console.log(url);
        fireAJAX(url, key);
      }
    }

    var spanID;
    for (var i = 1; i <= colors.length; i++) {
      spanID = '#color-' + i;
      $(spanID).css('background-color', colors[i]);
    }

    var state_obj = state_info['CO']
    function fireAJAX(url, key) {
      $.ajax({url:url, dataType:"jsonp"}).then(function(weather_data) {

                  // console.log(weather_data)
                  var stateID = `#${key}`;
                  // TODO
                  // Fill in the RHS of the below line and uncomment it. Remember how we accessed the temperature in Lab 9.
                  var temperature = weather_data.currently.temperature;

                  console.log(stateID)
                  console.log(temperature)

                  var color = colors[0];
                  //TODO
                  // Default color gray
                  // Create a series of if else blocks to set the color for the state based on the temperature
                  if (temperature == null || temperature == undefined) {

                  }
                  else if (temperature <= 10) {
                    color = colors[1];
                  }
                  else if (temperature <= 20) {
                    color = colors[2];
                  }
                  else if (temperature <= 30) {
                    color = colors[3];
                  }
                  else if (temperature <= 40) {
                    color = colors[4];
                  }
                  else if (temperature <= 50) {
                    color = colors[5];
                  }
                  else if (temperature <= 60) {
                    color = colors[6];
                  }
                  else if (temperature <= 70) {
                    color = colors[7];
                  }
                  else if (temperature <= 80) {
                    color = colors[8];
                  }
                  else if (temperature <= 90) {
                    color = colors[9];
                  }
                  else {
                    color = colors[10];
                  }

                  $(stateID).css('fill', color);   // Example on how to fill colors for your state.
      });
    }

});
