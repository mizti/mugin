var JHR = function ( url, method, data, fun ) {
	var xhr = new XMLHttpRequest();
	xhr.responseJSON = null;
	
	//xhr.open( 'POST', url );
	xhr.open( method, url );
	xhr.setRequestHeader( 'Content-Type', 'application/json' );
	xhr.addEventListener( 'load',  function () {
		xhr.responseJSON = JSON.parse( xhr.responseText );
		fun( xhr.responseJSON, xhr );
	});
	xhr.send( JSON.stringify(data) );
	return xhr;
};
