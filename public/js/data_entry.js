var publishing = false;

function submitData() {

    if (!publishing) {
        
        $('#uploading').html("");

        if (inputVerification()) {

            pushData();
            publishing = true;
    
        }
    }

}

function inputVerification() {

    var check = true;

    if (isNaN(parseInt($('#team').val()))) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter a team number.");
        check = false;
    }

    if (isNaN(parseInt($('#matchnumber').val()))) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter a match number.");
        check = false;
    }

    if (typeof $('label#startingpos.active').attr('value') == "undefined") {
        $('#uploading').html($('#uploading').html() + "<br>Please select a value for starting position.");
        check = false;
    }

    if (typeof $('label#alliance.active').attr('value') == "undefined") {
        $('#uploading').html($('#uploading').html() + "<br>Please select a value for alliance.");
        check = false;
    }

    if (typeof $('label#plate_1.active').attr('value') == "undefined") {
        $('#uploading').html($('#uploading').html() + "<br>Please select a value for plate 1.");
        check = false;
    }

    if (typeof $('label#plate_2.active').attr('value') == "undefined") {
        $('#uploading').html($('#uploading').html() + "<br>Please select a value for plate 2.");
        check = false;
    }

    if (typeof $('label#plate_3.active').attr('value') == "undefined") {
        $('#uploading').html($('#uploading').html() + "<br>Please select a value for plate 3.");
        check = false;
    }

    check = checkNumberField("auto_switch_score") && check;
    check = checkNumberField("auto_switch_miss") && check;
    check = checkNumberField("auto_scale_score") && check;
    check = checkNumberField("auto_scale_miss") && check;

    if (isNaN(parseInt($('label#reachline.active').attr('value')))) {
        $('#uploading').html($('#uploading').html() + "<br>Please select a value for reach line.");
        check = false;
    }

    check = checkNumberField("teleop_switch_score") && check;
    check = checkNumberField("teleop_switch_miss") && check;
    check = checkNumberField("teleop_scale_score") && check;
    check = checkNumberField("teleop_scale_miss") && check;
    check = checkNumberField("teleop_oppswitch_score") && check;
    check = checkNumberField("teleop_oppswitch_miss") && check;
    check = checkNumberField("teleop_vault") && check;

    if (typeof $('input[name="climb"]:checked').val() == "undefined") {
        $('#uploading').html($('#uploading').html() + "<br>Please select a value for the climb.");
        check = false;
    }

    return check;
}

function checkNumberField(fieldID) {

    var fieldName = fieldID.replace(/_/g, " ");

    if (isNaN(parseInt($("#" + fieldID).val()))) {
        $('#uploading').html($('#uploading').html() + "<br>Please enter a number for " + fieldName + ".");
        return false;
    }

    return true;

}


function pushData() {

    var team = parseInt($('#team').val());
    var matchno = parseInt($('#matchnumber').val());

    $('#uploading').html($('#uploading').html() + "<br>Uploading...");

    var match = firebase.database().ref('teams/' + team).push();
    
    match.set({

        match_number: matchno,
        match_scouter: $('#scouter').val() == "" ? "-" : $('#scouter').val(),
        match_comment: $('#comment').val() == "" ? "-" : $('#comment').val(),
        match_startpos: $('label#startingpos.active').attr('value'),
        match_alliance: $('label#alliance.active').attr('value'),
        match_plates: $('label#plate_1.active').attr('value') + $('label#plate_2.active').attr('value') + $('label#plate_3.active').attr('value'),

        auto_reachline: parseInt($('label#reachline.active').attr('value')),
        auto_switch_score: parseInt($('#auto_switch_score').val()),
        auto_switch_miss: parseInt($('#auto_switch_miss').val()),
        auto_scale_score: parseInt($('#auto_scale_score').val()),
        auto_scale_miss: parseInt($('#auto_scale_miss').val()),

        teleop_switch_score: parseInt($('#teleop_switch_score').val()),
        teleop_switch_miss: parseInt($('#teleop_switch_miss').val()),
        teleop_scale_score: parseInt($('#teleop_scale_score').val()),
        teleop_scale_miss: parseInt($('#teleop_scale_miss').val()),
        teleop_oppswitch_score: parseInt($('#teleop_oppswitch_score').val()),
        teleop_oppswitch_miss: parseInt($('#teleop_oppswitch_miss').val()),
        teleop_vault: parseInt($('#teleop_vault').val()),

        climb_type: $('input[name="climb"]:checked').val(),
        climb_lifted: $('#lifted').prop('checked'),
        climb_carried: $('#carried').prop('checked'),
        climb_parked: $('#parked').prop('checked')

    }).then(function(done) {

        $('#uploading').html($('#uploading').html() + "<br>Done publishing data!");

        var updates = {};
        updates[team] = match.key;

        firebase.database().ref('matches/' + matchno).update(updates).then(function() {

            firebase.database().ref('meta_teams/' + team).set({
            
                team: team,
                stats_updated: false
    
            }).then(function(){
                
                $('#uploading').html($('#uploading').html() + "<br>Team registered in database!");
    
                window.location.reload(false);
    
            });

        });

    });

}