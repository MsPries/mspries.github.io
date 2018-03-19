function calculate_it(){
	try {
		var syn0 = JSON.parse(document.getElementById("syn0").value);
		var syn1 = JSON.parse(document.getElementById("syn1").value);
	} catch(e) {
		alert("Bad JSON syntax :(");
		return;
	}

	function nonlin(n){
		var ret = [];
		for (var i = 0; i < n.length; i++){
			ret[i] = [];
			for (var j = 0; j < n[i].length; j++){
				ret[i][j] = [(1/(1+Math.pow(Math.E, -(n[i][j]))))];
			}
		}
		return ret;
	}

	function dot(a, b){
		var c = [];
		var total = 0;
		var rows = a.length;
		var cols = b[0].length;
		for (var i = 0; i < rows; i++){
			c[i] = [];
			for (var j = 0; j < cols; j++){
				total = 0;
				for (var k = 0; k < a[i].length; k++){
					total += a[i][k] * b[k][j]
				}
				c[i][j] = total;
			}
		}
		return c;
	}

	function pick_a_side(layer){
		var ret = [];
		for (var i = 0; i < layer.length; i++){
			ret[i] = [(layer[i] < .5) ? 0 : 1];
		}
		return ret;
	}

	function check_output(truth, out){
		var match = true;
		for (var i = 0; i < truth.length; i++){
			if (truth[i][0] != out[i][0]){
				match = false;
			}
		}
		return match;
	}

	function feed_forward(x, syn0, syn1){
		var l1 = nonlin(dot(x, syn0));
		var l2 = nonlin(dot(l1, syn1));
		return pick_a_side(l2);
	}

	[x, y] = generate_input();
	var z = feed_forward(x, syn0, syn1);
	display_analysis(x, z, y);
	if(check_output(y, z)){
		alert("Well done! Clue #3:  " + atob("MjQ="));
	} else {
		alert ("Not yet - try again!");
	}
}

function generate_input(){
	var x = [];
	var y = [];

	for (var i = 0; i < 30; i++){
		var a = Math.round(Math.random());
		var b = Math.round(Math.random());
		x[i] = [a, b];
		y[i] = [(a ? !b : b) & 1]
	}

	return [x,y];
}

function display_analysis(x, z, y){
	var corn_div = "<td><div class='dot'>🌽</div></td>";
	var strawb_div = "<td><div class='dot'>🍓</div></td>";
	var table = '<table cellspacing="10"><tr><th>A</th><th>B</th><th>Correct Answer</th><th>Your Guess</th></tr>';
		try {
		for (var i = 0; i < y.length; i++){
			table += '<tr>';
			if (x[i][0] == 0){
				table += corn_div;
			} else {
				table += strawb_div;
			}
			if (x[i][1] == 0){
				table += corn_div;
			} else {
				table += strawb_div;
			}
			if (y[i][0] == 0){
				table += corn_div;
			} else {
				table += strawb_div;
			}
			if (z == null){
				table += strawb_div;
			} else if (z[i][0] == 0) {
				table += corn_div;
			} else {
				table += strawb_div;
			}
			table += '</tr>';
		}
		table += "</table>";
		$("#dots").html(table);
	} catch(e) {
		
	}
}

function message_it(){
	var guess = document.getElementById("mes").value;
	if(guess === atob("NDU0MjI0MjU0NDQyNDUyNDI1NTU0MjU0NTU1MjQ1NDUyMjQ0NTU0MjI0NDUyNDU0MjQyMjQ1MjI0NTU0MjI0NDQ0NDQyMjI1NDI1MjQyNTI1NTQyNTIyNTUyNDQ0NTQ1NTQ0NDIyNTU1NDQ1NDU1NDIyNDU0MjQyNDIyNTUyNDI0NTU1NDU0NDI1MjUyMjQ1MjUyNDU1MjU0NDIyNDUyNTI1NDQ0MjI0NDU0MjI0NDQ0NDQ0NTI1NDIyNTU0MjQ0NTI0NTI1NDI1MjQ0NTU0NTU0NDQ1NDI1NDI0MjU0MjU0NTI1NDI1NDQ0NDU0MjUyMjU0MjI1MjI1MjQ0NDU0MjIyNDQ1MjU1NTQyMjQ1MjU1NDI0NTUyMjQyNTU0MjU0MjU0NTU0NTU0MjU1NDU1NDQ1NTU0NTQyNDQ1NTU0NDUyNDI1NTI0NTI1MjU0MjQ0NTQ0MjI1NDI1NTQ0MjUyNTQ0NTQ0MjQ1MjI1NTU0NTI0NTQyNDQyMjUyMjIyNTQ1NDQyMjQyNTQ0MjQ1NDQ0NTQ0NTIyNDI1MjQyNDUyMjI1NTI0NTUyNDQ0MjIyNDQ0NDQyMjUyMjQyMjQ1NDU1MjI0MjQ0MjIyMjQyNDQyNTUyNDI0NTU0NDQ0MjU0NTU0NDQ1MjQ0MjU1NTQyNDQ1NTUyMjQ0NTUyNDQ1MjU0NTQ0MjUyNDU1NTU0NDQyNTU0MjQ1NTIyNDUyNDUyMjI0NDI1NTU1NTI0MjU0NTIyNTUyNDIyNDU1MjU1MjQ0MjQ0NDU0NTU0NDQ0MjQ1MjI0NDQyNTUyNTUyMjI1MjQyMjUyNDI1NDI1NTI1MjI0NTI1NDU0MjUyNDQyMjU0NDI1NDIyMjQ1MjU0NTQ0NDI1MjI0NDU1MjQyNDQ0NTI0NDI0MjIyNTQyNDI0NDI1NTQyNDU1MjI0NDU1NDUyMjQyMjQ0NDI0NTIyNTQ0NDUyMjQ0NDQ0NDI0NDUyNDI0NDUyNTU1NTUyNTU0NDIyNTU1NDQ0NTQ0NDQ1NDU1NDQ0NTI1NTI1NDI0MjQ1MjU0MjU0NDIyNTI0NTIyNTQyMjQ1NTU1NTI1NTU1NTUyMjQ0MjU1NDQ1MjU0NDU0NDU1MjIyNDQyNTQ0MjQ1NTI1NDU1MjI1NDU1NTQyNDUyMjQ1NDUyNTUyMjQ0MjI1NTIyMjQyNDIyNTU1MjI1NDUyNTI0NDI1NDIy")){
		alert("Well done! Clue #2:  " + atob("MTA="));
	} else {
		alert ("Not yet - try again!");
	}
}

function road_it(){
	console.log("TODO");
}

function check_it(){
	var guess = document.getElementById("check").value;
	if(guess === atob("Tk8gUExBQ0UgTElLRSB+")){
		alert("You win!");
	} else{
		alert("Keep looking...");
	}
}

$(document).ready(function(){
	var x, y = [];
	[x, y] = generate_input();
	display_analysis(x, null, y);

	display_analysis();
	$(".char").on('click', function() {
		var conv = ['judy', 'lion', 'scare', 'tin']
		var val = conv.indexOf($(this)[0].id);
		$(".char").each(function(i){
			if($(this)[0].id === conv[val]){
				$(this).css("border-radius", "30%");
			} else {
				$(this).css("border-radius", "50%");
			}
		});
		$(".clue").each(function(i){
			if(($(this).css('display') != 'none') && $(this)[0].id != val.toString()){
				$(this).fadeOut( "slow", function() {});
			}
		});
		$(".clue").each(function(i){
			if($(this)[0].id === val.toString()){
				$(this).fadeIn("slow", function(){});
			}
		});
	});
});