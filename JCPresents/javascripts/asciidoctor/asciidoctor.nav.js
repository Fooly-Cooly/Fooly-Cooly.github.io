let starttime
let List = { };
let lastScrollTop = 0, isScrolling = false, wasScrolling = false, scriptScroll = false;

window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function( f ){ return setTimeout( f, 1000/60 ) } // simulate calling code 60

window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || function( requestID ){ clearTimeout( requestID ) } //fall back


function asciiDoc_Init() {

	let navButton = document.getElementsByClassName( "navCSS" );
	for (let i = 0; i < navButton.length; i++)
		navButton[i].addEventListener( "click", asciiDoc_CSS );

	navButton = document.getElementsByClassName( "navClick" );
	for (let i = 0; i < navButton.length; i++)
		navButton[i].addEventListener( "click", asciiDoc_Load );

	navButton = document.getElementsByClassName( "navScroll" );
	for (let i = 0; i < navButton.length; i++)
		navButton[i].addEventListener( "click", asciiDoc_Scroll );

	setTimeout( function() {

		let loader = document.getElementById( "loader" );
		loader.addEventListener("transitionend", function(){ loader.style.display = "none"; } );
		loader.style.opacity = "0";
	}, 5000 );

	asciiDoc_Load( "2021" );
}

function asciiDoc_Load( page ) {

	if( event ) page = event.srcElement.innerText.toLowerCase();
	let asciidoctor = Asciidoctor();
	let file = 'webpages/' + page + '.adoc';
	let content = document.getElementById('content');
		content.style.opacity = "0";

	fetch( file )
		.then(response => {

		    if ( !response.ok && response.status == 404 )
				throw '404 File Not Found "' + page + '.adoc"';

			return response.text()
		})
		.then((data) => {

			let html = asciidoctor.convert( data );
			content.innerHTML = html;

			let observer = new IntersectionObserver( function( entries ) {

				entries.forEach( x => {
					if ( x.isIntersecting ) {
						List.index = x.target.name;
					}
				});
			}, { threshold: [0.5] });

			List = document.getElementsByClassName( "sect1" );
			List.oindx = 0;
			List.index = 0;
			for (let i = 0; i < List.length; i++) {
				List[i].name = i;
				observer.observe( List[i] );
			}

			asciiDoc_CSS( "default" );
			setTimeout( function(){ content.style.opacity = "1"; }, 250 );
	})
	.catch(error => {

		error = "[.text-center]\n== " + error + "";
		let html = asciidoctor.convert( error );
		content.innerHTML = html;
	});
	
}

function asciiDoc_CSS( style ) {

	if( event ) style = event.srcElement.innerText.toLowerCase();
	document.getElementById('theme_css').href = 'stylesheets/list-' + style + '.css';
}

function asciiDoc_Scroll( IN ) {

	if ( event ) {
		IN = event.srcElement.innerText == "⇑" ? -1 : +1;
		event.preventDefault();
	}
	scriptScroll = true;

	List.index += IN;
	if ( List.index < 0 )
		List.index = List.length-1;
	else if ( List.index > List.length-1 )
		List.index = 0;

	List[List.index].scrollIntoView( { behavior: 'smooth', block: 'start' } );
}

function fade( timestamp, el1, el2, duration ) {

	//timestamp = timestamp || new Date().getTime();	//if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
	let runtime = timestamp - starttime;
	let progress = ( runtime * 100 ) / duration;

	let op = el1.style.opacity || 1;
	if ( op > 0.1 ) {
		op = el1.style.opacity = ( 1 - ( progress / 100 ) ); //* progress).toFixed(2);
		el1.style.filter = 'alpha(opacity=' + ( 1 - ( progress / 100 ) ) + ")";
	}
	else {
		el1.style.display = 'none';
	}

	op = el2.style.opacity || 0;
	if ( op <= 0 ) {
		el1.style.position = 'absolute';
		el2.style.position = 'relative';
		el2.style.display = 'block';
	}
	if ( op < 1 ) {
		op = el2.style.opacity = ( progress / 100 ); //* progress).toFixed(2);
		el2.style.filter = 'alpha(opacity=' + ( progress / 100 ) + ")";
	}

	// if duration not met yet, call requestAnimationFrame again with parameters
    if ( runtime < duration ) {

        requestAnimationFrame( function( timestamp ) {

           fade( timestamp, el1, el2, duration );
        })
    }
}

function asciiDoc_Toggle( index ) {

	let el1,el2;
	let movie = document.getElementById( "movie" + index );
	let mystery = document.getElementById( "mystery" + index );
	starttime = new Date().getTime();

	if (mystery.style.display === "none") {

		el1 = movie;
		el2 = mystery;
	} else {

		el1 = mystery;
		el2 = movie;
	}
	requestAnimationFrame( function( timestamp ) {

		starttime = timestamp; //|| new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
		fade( timestamp, el1, el2, 1000 ); // 400px over 1 second
	})
}