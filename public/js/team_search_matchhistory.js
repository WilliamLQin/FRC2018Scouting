function populateMatchHistory() {
    matchHistoryOverall();
    matchHistoryAuto();
    matchHistoryTeleop();
    matchHistoryMisc();
    matchHistoryComments();
}

function matchHistoryOverall() {

    $('#overall_table').html("");

    for (i = 0; i < data.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data.match_number[i]));
        row.append($('<td></td>').text(data.overall_auto_score[i] + " (" + data.overall_auto_miss[i] + ")"));
        row.append($('<td></td>').text(data.overall_teleop_score[i] + " (" + data.overall_teleop_miss[i] + ")"));

        $('#overall_table').append(row);

    }

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

function matchHistoryMisc() {

    $('#misc_table').html("");

    for (i = 0; i < data.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data.match_number[i]));
        row.append($('<td></td>').text(data.match_startpos[i][0].toUpperCase() + data.match_startpos[i].substring(1)));
        row.append($('<td></td>').text(data.match_alliance[i][0].toUpperCase() + data.match_alliance[i].substring(1)));
        row.append($('<td></td>').text(data.match_plates[i]));

        var climb = "";
        climb += data.climb_type[i][0].toUpperCase() + data.climb_type[i].substring(1);
        climb += data.climb_lifted[i] ? ", Lifted" : "";
        climb += data.climb_carried[i] ? ", Carried" : "";
        climb += data.climb_parked[i] ? ", Parked" : "";

        row.append($('<td></td>').text(climb));

        $('#misc_table').append(row);

    }

}

function matchHistoryComments() {

    $('#comment_table').html("");

    for (i = 0; i < data.match_number.length; i++) {

        var row = $('<tr></tr>');

        row.append($('<th scope="row"></th>').text(data.match_number[i]));
        row.append($('<td></td>').text(data.match_scouter[i]));
        row.append($('<td></td>').text(data.match_comment[i]));

        $('#comment_table').append(row);

    }

}