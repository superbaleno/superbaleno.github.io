google.load("visualization", "1");
google.setOnLoadCallback(getCell);


function getCell() {
    var queryString = encodeURIComponent('select F,G');
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1Tirk5BxkKzxNa9afgo4EGSXc8Djpz8FsXJO5YKQ6CF0/gviz/tq?gid=1422628122tq=' + queryString);
    query.send(handleQueryResponse);
}


function handleQueryResponse(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var data = response.getDataTable();  
	var ultReg = data.getValue(1,5);
	var digitos = [Math.floor(ultReg/100), Math.floor((ultReg%100)/10), Math.floor(ultReg%10), Math.floor(10*ultReg%10)];
	var casilleros = document.getElementsByClassName("digito");
	for(i in casilleros){
		casilleros[i].innerHTML = digitos[i];
	}
	var totales = document.getElementById("totales");
	for(var i = 1; i < totales.rows.length; i++){
		totales.rows[i].cells[1].innerHTML = data.getValue(i+2,5).toFixed(1) + " km";
		totales.rows[i].cells[2].innerHTML = "$" + data.getValue(i+2,6).toFixed(2);
	}
}