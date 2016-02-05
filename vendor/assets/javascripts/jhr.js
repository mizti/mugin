var JHR = function ( url, data, fun ) {
	var xhr = new XMLHttpRequest();
	xhr.responseJSON = null;
	
	xhr.open( 'POST', url );
	xhr.setRequestHeader( 'Content-Type', 'application/json' );
	xhr.addEventListener( 'load',  function () {
		xhr.responseJSON = JSON.parse( xhr.responseText );
		console.log(xhr)
		console.log(xhr.responseJSON)
		fun( xhr.responseJSON, xhr );
	});
	xhr.send( JSON.stringify(data) );
	return xhr;
};
