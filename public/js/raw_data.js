const dbTeamsList = firebase.database().ref('matches');

// for each team
dbTeamsList.on('child_added', snap => {

  // Create team entry in matches list
  var teamLi = $('<li></li>').attr("class", "list-group-item");

  var teamUl = $('<ul></ul>').attr("class", "list-group");
  
  teamLi.append($('<h2></h2>').text(snap.key));
  teamLi.append(teamUl);
  $('allmatches').append(teamLi);

  // for each match in team
  snap.forEach(function(matchsnap){

    var matchLi = $('<li></li>').attr("class", "list-group-item");

    matchsnap.forEach(function(datasnap){

      matchLi.append($('<p></p>').text(datasnap.key + ": " + datasnap.val()));

    });

  });

});