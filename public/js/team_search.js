const db = firebase.database();

$(document).ready(function() {

  hideAll();

  $("#section-stats").show();

  $("button[id^=tab]").click(function() {

    hideAll();

    $("#section-" + $(this).attr("id")).show();
    $("#menu").text($(this).text());

  });

});

function hideAll() {
  $("#section-tab-stats").hide();
  $("#section-tab-statsgraphs").hide();
  $("#section-tab-matches").hide();
  $("#section-tab-matchesgraphs").hide();
  $("#section-tab-insights").hide();
}

var team = 0;

var data = {};

function loadTeam() {

  if (isNaN(parseInt($("#team").val()))) {
    $("#alerts").text("Please enter a valid team number.");
    return;
  }

  team = parseInt($("#team").val());

  retrieveData();
}

function retrieveData() {
  db.ref("matches/" + team).on('value', function(snap){

    if (snap.exists()) {

      $("#alerts").text("Viewing data for team: " + team);

      data = {};

      snap.forEach(function(matchsnap) {
        parseMatch(matchsnap);
      });

      // Matches have been retrieved
      populateMatchHistory();

    }
    else {

      $("#alerts").html("Failed to retrieve data for team: " + team + "<br>Please check your internet connection and if the team exists in the database.");

    }

  });
}

function parseMatch(matchsnap) {

  matchsnap.forEach(function(infosnap) {

    if (typeof data[infosnap.key] == "undefined") {
      data[infosnap.key] = [];
    }

    data[infosnap.key].push(infosnap.val());

  });

}

function populateMatchHistory() {
  matchHistoryAuto();
  matchHistoryTeleop();
}

function matchHistoryAuto() {

  $('#auto_table').html("");

  for (i = 0; i < data.match_number.length; i++) {

    var row = $('<tr></tr>');

    row.append($('<th scope="row"></th>').text(data.match_number[i]));
    row.append($('<td></td>').text(data.auto_switch_score[i] + " (" + data.auto_switch_miss[i] + ")"));
    row.append($('<td></td>').text(data.auto_scale_score[i] + " (" + data.auto_scale_miss[i] + ")"));
    row.append($('<td></td>').text(data.auto_reachline[i] == 1 ? "Yes" : "No"));

    $('#auto_table').append(row);

  }

}

function matchHistoryTeleop() {

  $('#teleop_table').html("");

  for (i = 0; i < data.match_number.length; i++) {

    var row = $('<tr></tr>');

    row.append($('<th scope="row"></th>').text(data.match_number[i]));
    row.append($('<td></td>').text(data.teleop_switch_score[i] + " (" + data.teleop_switch_miss[i] + ")"));
    row.append($('<td></td>').text(data.teleop_scale_score[i] + " (" + data.teleop_scale_miss[i] + ")"));
    row.append($('<td></td>').text(data.teleop_oppswitch_score[i] + " (" + data.teleop_oppswitch_miss[i] + ")"));
    row.append($('<td></td>').text(data.teleop_vault[i]));

    $('#teleop_table').append(row);

  }

}
