const db = firebase.database();

var match = 0;

function loadMatch() {

    if (isNaN(parseInt($("#match").val()))) {
        $("#alerts").text("Please enter a valid match number.");
        return;
    }

    match = parseInt($("#match").val());

    retrieveData();
}

function retrieveData() {
    db.ref("matches/" + match).on('value', function(snap){

        if (snap.exists()) {

            $("#alerts").html("Viewing data for match: " + match);
            
            $("#section-tab-matches").show();

            clearAllTables();

            snap.forEach(function(teamsnap) {
                parseTeam(teamsnap);
            });

        }
        else {

            $("#alerts").html("Failed to retrieve data for match: " + match + "<br>Please check your internet connection and if the match exists in the database.");

        }

    });
}

function parseTeam(teamsnap) {

    db.ref("teams/" + teamsnap.key + "/" + teamsnap.val()).on('value', function(matchsnap){

        dataTeam = {};

        matchsnap.forEach(function(infosnap) {
        
            dataTeam[infosnap.key] = infosnap.val();
        
        });

        addTeamToTable(dataTeam, teamsnap.key);

    });

}

function clearAllTables() {

    $('#auto_table').html("");
    $('#teleop_table').html("");
    $('#misc_table').html("");
    $('#comment_table').html("");

}

function addTeamToTable(data, team) {

    // Auto Table

    var row = $('<tr></tr>');

    row.append($('<th scope="row"></th>').text(team));
    row.append($('<td></td>').text(data.auto_switch_score + " (" + data.auto_switch_miss + ")"));
    row.append($('<td></td>').text(data.auto_scale_score + " (" + data.auto_scale_miss + ")"));
    row.append($('<td></td>').text(data.auto_reachline == 1 ? "Yes" : "No"));

    $('#auto_table').append(row);

    // Teleop Table

    var row = $('<tr></tr>');

    row.append($('<th scope="row"></th>').text(team));
    row.append($('<td></td>').text(data.teleop_switch_score + " (" + data.teleop_switch_miss + ")"));
    row.append($('<td></td>').text(data.teleop_scale_score + " (" + data.teleop_scale_miss + ")"));
    row.append($('<td></td>').text(data.teleop_oppswitch_score + " (" + data.teleop_oppswitch_miss + ")"));
    row.append($('<td></td>').text(data.teleop_vault));

    $('#teleop_table').append(row);

    // Misc Table

    var row = $('<tr></tr>');

    row.append($('<th scope="row"></th>').text(team));
    row.append($('<td></td>').text(data.match_startpos[0].toUpperCase() + data.match_startpos.substring(1)));
    row.append($('<td></td>').text(data.match_alliance[0].toUpperCase() + data.match_alliance.substring(1)));
    row.append($('<td></td>').text(data.match_plates));

    var climb = "";
    climb += data.climb_type[0].toUpperCase() + data.climb_type.substring(1);
    climb += data.climb_lifted ? ", Lifted" : "";
    climb += data.climb_carried ? ", Carried" : "";
    climb += data.climb_parked ? ", Parked" : "";

    row.append($('<td></td>').text(climb));

    $('#misc_table').append(row);

    // Comment Table

    var row = $('<tr></tr>');

    row.append($('<th scope="row"></th>').text(team));
    row.append($('<td></td>').text(data.match_scouter));
    row.append($('<td></td>').text(data.match_comment));

    $('#comment_table').append(row);


}