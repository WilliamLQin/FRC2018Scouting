function populateStats() {

    $("#stats_table").html("");

    addDualAnalysis("Auto Switch", analyzeSet(data.auto_switch_score), analyzeSet(data.auto_switch_miss));
    addDualAnalysis("Auto Scale", analyzeSet(data.auto_scale_score), analyzeSet(data.auto_scale_miss));
    addDualAnalysis("Teleop Switch", analyzeSet(data.teleop_switch_score), analyzeSet(data.teleop_switch_miss));
    addDualAnalysis("Teleop Scale", analyzeSet(data.teleop_scale_score), analyzeSet(data.teleop_scale_miss));
    addDualAnalysis("Teleop Opp. Switch", analyzeSet(data.teleop_oppswitch_score), analyzeSet(data.teleop_oppswitch_miss));
    addAnalysis("Vault", analyzeSet(data.teleop_vault));

}

function analyzeSet(dataset) {

    var median = math.median(dataset);

    // split the data by the median
    var firstHalf = dataset.filter(function(f){ return f <= median });
    var secondHalf = dataset.filter(function(f){ return f >= median });

    // find the medians for each split
    var q1 = math.median(firstHalf);
    var q3 = math.median(secondHalf);

    var IQR = q3-q1;

    var mean = math.mean(dataset);

    var stdev = math.std(dataset);

    var range = Math.max(...dataset) - Math.min(...dataset);

    return [median, IQR.toFixed(1), mean.toFixed(2), stdev.toFixed(2), range];

}

function addAnalysis(name, analysis) {

    var row = $('<tr></tr>');

    row.append($('<td></td>').text(name));
    row.append($('<td></td>').text(analysis[0]));
    row.append($('<td></td>').text(analysis[1]));
    row.append($('<td></td>').text(analysis[2]));
    row.append($('<td></td>').text(analysis[3]));
    row.append($('<td></td>').text(analysis[4]));

    $('#stats_table').append(row);

}

function addDualAnalysis(name, analysis1, analysis2) {

    var row = $('<tr></tr>');

    row.append($('<td></td>').text(name));
    row.append($('<td></td>').text(analysis1[0] + " (" + analysis2[0] + ")"));
    row.append($('<td></td>').text(analysis1[1] + " (" + analysis2[1] + ")"));
    row.append($('<td></td>').text(analysis1[2] + " (" + analysis2[2] + ")"));
    row.append($('<td></td>').text(analysis1[3] + " (" + analysis2[3] + ")"));
    row.append($('<td></td>').text(analysis1[4] + " (" + analysis2[4] + ")"));

    $('#stats_table').append(row);

}