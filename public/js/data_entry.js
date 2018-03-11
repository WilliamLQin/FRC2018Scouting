$(document).ready(function() {
    
    const db = firebase.database().ref('allteams/');

});


function submitData() {

    

}

function inputVerification() {
    
}



function updateDatabase() {

    var matchString = 'match' + parseInt(matchNumber);

    var updateCount = {};
    updateCount['match-count'] = matchNumber;
    db.child(team).update(updateCount);

    try {

        db.child(team + '/matches/' + matchString).set({
            starting_position: document.getElementById('position').value,
            auto_baseline: document.querySelector('input[name="baseline"]:checked').value,
            auto_switch_success: document.getElementById('auto_switch_success').value,
            auto_switch_fail: document.getElementById('auto_switch_fail').value,
            auto_scale_success: document.getElementById('auto_scale_success').value,
            auto_scale_fail: document.getElementById('auto_scale_fail').value,
            teleop_switch_success: document.getElementById('teleop_switch_success').value,
            teleop_switch_fail: document.getElementById('teleop_switch_fail').value,
            teleop_scale_success: document.getElementById('teleop_scale_success').value,
            teleop_scale_fail: document.getElementById('teleop_scale_fail').value,
            teleop_opp_switch_success: document.getElementById('teleop_opp_switch_success').value,
            teleop_opp_switch_fail: document.getElementById('teleop_opp_switch_fail').value,
            teleop_vault: document.getElementById('teleop_vault').value,
            offense: document.getElementById('offense').checked,
            defense: document.getElementById('defense').checked,
            climb: document.getElementById('climb').value,
            boost: document.getElementById('boost').checked,
            force: document.getElementById('force').checked,
            levitate: document.getElementById('levitate').checked,
            powerup_times: document.getElementById('powerup_time').value,
            disconnects: document.getElementById('dcs').value,
            team_number: document.getElementById('team').value,
            match_number: document.getElementById('matchnumber').value,
            scouter: document.getElementById('scouter').value,
            comment: document.getElementById('comment').value
        }).then(function(done) {
            console.log("Successfully uploaded data to allteams/" + team + "/matches/" + matchString);
            successDataUpload('matchdata-loading', "Match data upload succeeded!");
        });

    } catch (err) {
        failDataUpload('matchdata-loading', "Match data upload failed.");
        console.log("Match data upload failed /matches/");
    }

    if (document.getElementById('comment').value == "" || document.getElementById('comment').value == null) {
        document.getElementById('comment').value = "-";
    }

    try {
        db.child(team + '/matches-info/' + matchString).set({
            number: document.getElementById('matchnumber').value,
            scouter: document.getElementById('scouter').value,
            comment: document.getElementById('comment').value
        }).then(function(done) {
            console.log("Successfully uploaded data to allteams/" + team + "/matches-info/" + matchString);
            successDataUpload('matchinfo-loading', "Match info upload succeeded!");
        });
    } catch (err) {
        failDataUpload('matchinfo-loading', "Match data upload failed.");
        console.log("Match data upload failed /matches-info/");
    } 

    firebase.database().ref().child('teamlist/' + team).set(1);

    console.log("Team " + team + " added to teamlist.");

    var query = firebase.database().ref("rawdata").orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            valKey.push(key);
        });
        var keys = valKey.length;
        RawData(keys);
    });
}

function RawData(keys) {
    firebase.database().ref().child('rawdata/' + keys).set({
        starting_position: document.getElementById('position').value,
        auto_baseline: document.querySelector('input[name="baseline"]:checked').value,
        auto_switch_success: document.getElementById('auto_switch_success').value,
        auto_switch_fail: document.getElementById('auto_switch_fail').value,
        auto_scale_success: document.getElementById('auto_scale_success').value,
        auto_scale_fail: document.getElementById('auto_scale_fail').value,
        teleop_switch_success: document.getElementById('teleop_switch_success').value,
        teleop_switch_fail: document.getElementById('teleop_switch_fail').value,
        teleop_scale_success: document.getElementById('teleop_scale_success').value,
        teleop_scale_fail: document.getElementById('teleop_scale_fail').value,
        teleop_opp_switch_success: document.getElementById('teleop_opp_switch_success').value,
        teleop_opp_switch_fail: document.getElementById('teleop_opp_switch_fail').value,
        teleop_vault: document.getElementById('teleop_vault').value,
        offense: document.getElementById('offense').checked,
        defense: document.getElementById('defense').checked,
        climb: document.getElementById('climb').value,
        boost: document.getElementById('boost').checked,
        force: document.getElementById('force').checked,
        levitate: document.getElementById('levitate').checked,
        powerup_times: document.getElementById('powerup_time').value,
        disconnects: document.getElementById('dcs').value,
        team_number: document.getElementById('team').value,
        match_number: document.getElementById('matchnumber').value,
        scouter: document.getElementById('scouter').value,
        comment: document.getElementById('comment').value
    })
}
//document.querySelector('input[name="genderS"]:checked').value;