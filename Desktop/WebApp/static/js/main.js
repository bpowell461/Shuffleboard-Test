var localCoords = {x:0, y:0, zone:0, color: ''};
var peerCoords = {x:0, y:0, zone: 0, color: ''};
var redPuck1;
var redPuck2;
var redPuck3;
var bluePuck1;
var bluePuck2;
var bluePuck3;
var score=0;
//var scoreBoard = {y:0, zone:0, type:true};
var conn;
var target;
var game = false;
var turn = false;
var puck = "";
var host = false;
var hostConn;
var moves=0;
interact('.yes-drop')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrict({
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      }),
    ],
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {}
  });






  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
	
	localCoords.x = x;
	localCoords.y = y;
  }

  function peerMoveListener (target) {
    
    // translate the element
    document.getElementById(target).style.webkitTransform =
    document.getElementById(target).style.transform =
      'translate(' + peerCoords.x + 'px, ' + peerCoords.y + 'px)';

    // update the posiion attributes
    document.getElementById(target).setAttribute('data-x', peerCoords.x);
    document.getElementById(target).setAttribute('data-y', peerCoords.y);
	moves++;
  }



  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;
  
  
  
  
  
  
  
	interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
	accept: '.yes-drop',
  // Require a 25% element overlap for a drop to be possible
	overlap: 0.25,
  // listen for drop related events:

	ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
	//conn.send(localCoords);
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
  },
  ondrop: function (event) {
	  localCoords.zone=parseInt(event.target.id, 10);
	  if (host==true)
	  {
		hostConn.send(localCoords);
		hostConn.send(event.relatedTarget.id);
	  }
	  else{
	  conn.send(localCoords);
	  conn.send(event.relatedTarget.id);
	  }
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
	switch(event.relatedTarget.id)
			{
			  case "red1":
				//localCoords.zone=parseInt(event.target.id, 10);
				redPuck1=localCoords;
				redPuck1.color = "red";
				console.log(redPuck1);
				break;
			  case "red2":
				//localCoords.zone=parseInt(event.target.id, 10);
				redPuck2=localCoords;
				redPuck2.color = "red";
				console.log(redPuck2);
				break;
			case "red3":
				//localCoords.zone=parseInt(event.target.id, 10);
				redPuck3=localCoords;
				redPuck3.color = "red";
				console.log(redPuck3);
				break;
			case "blue1":
				//localCoords.zone=parseInt(event.target.id, 10);
				bluePuck1=localCoords;
				bluePuck1.color = "blue";
				console.log(bluePuck1);
				break;
			case "blue2":
				//localCoords.zone=parseInt(event.target.id, 10);
				bluePuck2=localCoords;
				bluePuck2.color = "blue";
				console.log(bluePuck2);
				break;
			case "blue3":
				//localCoords.zone=parseInt(event.target.id, 10);
				bluePuck3=localCoords;
				bluePuck3.color = "blue";
				console.log(bluePuck3);
				break;
			default:
				console.log("Error")
				break;
			}
	moves++;
  }
});

/*interact('.redzone').dropzone({
  // only accept elements matching this CSS selector
	accept: '.yes-drop',
  // Require a 25% element overlap for a drop to be possible
	overlap: .75,
  // listen for drop related events:

	ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
	//conn.send(localCoords);
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
  },
  ondrop: function (event) {
	  if (host==true)
	  {
		hostConn.send(localCoords);
		hostConn.send(event.relatedTarget.id);
	  }
	  else{
	  conn.send(localCoords);
	  conn.send(event.relatedTarget.id);
	  }
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
	var elementId = "#"+event.relatedTarget.id;
	$(elementId).fadeOut(2000);
  }
});*/



interact('.drag-drop')
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrict({
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      })
    ],
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    onmove: dragMoveListener
  });
  
  
  
  
  
var userName = 'Anonymous';
var otherName = 'Anonymous';
var idKey = '';
var peer = new Peer({key: 'lwjd5qra8257b9'});




peer.on('open', function(id) {
	var paragraph = document.getElementById("peerID");
	var text = document.createTextNode(id);
	idKey = id;
	paragraph.appendChild(text);
	console.log('My peer ID is: ' + id);
});




function displayConnect(){
	var main = document.getElementById("main");
	var conn = document.getElementById("ConnectBox");
	document.getElementById("connName").innerHTML = "Name: " + userName;
	main.style.display= "none";
	conn.style.display= "initial";
}




function connectGame(){
	var connID=document.getElementById("idBox").value;
	conn = peer.connect(connID);
	conn.on('open', function() {
		conn.on('data', function(data) {
		if(game==true)
		{
			console.log('Received', data);
			if(typeof data=='object')
			{
			peerCoords.x = data.x;
			peerCoords.y = data.y;
			peerCoords.zone = data.zone;
			}
			else if(data==1000)
			{
				setScore();
				resetBoard();
			}
			else{
				
			switch(data)
			{
			  case "red1":
				redPuck1=peerCoords;
				redPuck1.color = "red";
				console.log(redPuck1);
				break;
			  case "red2":
				redPuck2=peerCoords;
				redPuck2.color = "red";
				console.log(redPuck2);
				break;
			case "red3":
				redPuck3=peerCoords;
				redPuck3.color = "red";
				console.log(redPuck3);
				break;
			case "blue1":
				bluePuck1=peerCoords;
				bluePuck1.color = "blue";
				console.log(bluePuck1);
				break;
			case "blue2":
				bluePuck2=peerCoords;
				bluePuck2.color = "blue";
				console.log(bluePuck2);
				break;
			case "blue3":
				bluePuck3=peerCoords;
				bluePuck3.color = "blue";
				console.log(bluePuck3);
				break;
			}
			
			peerMoveListener(data);
			}
		}
		else{
		console.log('Received', data);
		otherName = data;
		conn.send(userName);
		alert("You have connected to " + otherName +"'s game!");
			document.getElementById("startMenu").style.display ="none";
			document.getElementById("cont").style.display = "block";
			document.getElementById("redName").innerHTML = otherName;
			document.getElementById("blueName").innerHTML = userName;
			switchPucks();
			game = true;
			}
		});
		if(game==false){
		conn.send(userName);}
	});
}
		
function switchPucks()
{
	document.getElementById("red1").classList.remove("yes-drop","drag-drop");
	document.getElementById("red2").classList.remove("yes-drop","drag-drop");
	document.getElementById("red3").classList.remove("yes-drop","drag-drop");
	document.getElementById("blue1").classList.add("yes-drop","drag-drop");
	document.getElementById("blue2").classList.add("yes-drop","drag-drop");
	document.getElementById("blue3").classList.add("yes-drop","drag-drop");
	document.getElementById("blue1").classList.remove("no-drop");
	document.getElementById("blue2").classList.remove("no-drop");
	document.getElementById("blue3").classList.remove("no-drop");
	document.getElementById("red1").classList.add("no-drop");
	document.getElementById("red2").classList.add("no-drop");
	document.getElementById("red3").classList.add("no-drop");
}



function freezeBoard(target)
{
	target.classList.remove("yes-drop","drag-drop");
}
function unFreezeBoard(target)
{
	target.classList.add("yes-drop","drag-drop");
}
function hostGame(){
	document.getElementById("main").style.display = "none";
	document.getElementById("hostBox").style.display = "initial";
	document.getElementById("hostID").innerHTML = "Your ID: " + idKey;
	host = true;
	peer.on('connection', function(conn) {
		hostConn=conn;
		console.log(typeof conn)
		console.log(typeof hostConn);
		conn.on('open', function() {
		conn.on('data', function(data) {
			if(game==true)
		{
			console.log('Received', data);
			if(typeof data=='object')
			{
			peerCoords.x = data.x;
			peerCoords.y = data.y;
			peerCoords.zone = data.zone;
			}
			else if(data==1000)
			{
				setScore();
				resetBoard();
			}
			else{
				
			switch(data)
			{
			  case "red1":
				redPuck1=peerCoords;
				redPuck1.color = "red";
				console.log(redPuck1);
				break;
			  case "red2":
				redPuck2=peerCoords;
				redPuck2.color = "red";
				console.log(redPuck2);
				break;
			case "red3":
				redPuck3=peerCoords;
				redPuck3.color = "red";
				console.log(redPuck3);
				break;
			case "blue1":
				bluePuck1=peerCoords;
				bluePuck1.color = "blue";
				console.log(bluePuck1);
				break;
			case "blue2":
				bluePuck2=peerCoords;
				bluePuck2.color = "blue";
				console.log(bluePuck2);
				break;
			case "blue3":
				bluePuck3=peerCoords;
				bluePuck3.color = "blue";
				console.log(bluePuck3);
				break;
			}
			
			peerMoveListener(data);
			}
		}
			else{
			console.log('Received', data);
			otherName = data;
			alert(otherName + " has connected to your game!");
			document.getElementById("startMenu").style.display ="none";
			document.getElementById("cont").style.display = "block";
			document.getElementById("redName").innerHTML = userName;
			document.getElementById("blueName").innerHTML = otherName;
			game=true;
			}
		});
		if(game==false){
		conn.send(userName);}
		});
	});
}


function setNickname()
{
	var name=document.getElementById("nameBox").value;
	userName = name;
	var textX = "Name: " + name;
	document.getElementById("nickname").innerHTML =textX;
	document.getElementById("nameBox").value=" ";
}

function userScore()
{
  if(moves < 6)
  {
	  alert("All moves have not been made");
  }
  else{
	  if(host==true){
	    hostConn.send(1000);
		setScore();
		resetBoard();
	  }
	  else{
		conn.send(1000);
		setScore();
		resetBoard();
		}
}
}

function setScore()
{
	var bestThrow;
	var secThrow;
	var thirdThrow;
	
	var zone3 = [];
	var zone2 = [];
	var zone1 = [];
	
	
	var redPucks = [];
	var bluePucks = [];
	
	redPucks.push(redPuck1);
	console.log(redPuck1);
	redPucks.push(redPuck2);
	console.log(redPuck2);
	redPucks.push(redPuck3);
	console.log(redPuck3);
	
	bluePucks.push(bluePuck1);
	console.log(bluePuck1);
	bluePucks.push(bluePuck2);
	console.log(bluePuck2);
	bluePucks.push(bluePuck3);
	console.log(bluePuck3);
	
	//redPucks.sort(keysrt('zone'));
	//bluePucks.sort(keysrt('zone'));
	for(var i=0; i<redPucks.length; i++)
	{
		switch(redPucks[i].zone)
		{
			case 3:
			zone3.push(redPucks[i]);
			break;
			case 2:
			zone2.push(redPucks[i]);
			break;
			case 1:
			zone1.push(redPucks[i]);
			break;
		}
	}
	
	for(var i=0; i<bluePucks.length; i++)
	{
		switch(bluePucks[i].zone)
		{
			case 3:
			zone3.push(bluePucks[i]);
			break;
			case 2:
			zone2.push(bluePucks[i]);
			break;
			case 1:
			zone1.push(bluePucks[i]);
			break;
		}
	}
	zone3.sort(keysrt("y"));
	zone3.reverse();
	zone2.sort(keysrt("y"));
	zone2.reverse();
	zone1.sort(keysrt("y"));
	zone1.reverse();
	var throwCount=0;
	if(zone3.length !=0)
	{
	for(var i=0; i<zone3.length; i++)
	{
		if(throwCount=0)
		{
			bestThrow = zone3[i];
			throwCount++;
		}
		if(throwCount=1)
		{
			secThrow = zone3[i];
			throwCount++;
		}
		if(throwCount=2)
		{
			thirdThrow = zone3[i];
			throwCount++;
		}
	}
	}
	if(zone2.length !=0)
	{
	for(var i=0; i<zone2.length; i++)
	{
		if(throwCount=0)
		{
			bestThrow = zone2[i];
			throwCount++;
		}
		if(throwCount=1)
		{
			secThrow = zone2[i];
			throwCount++;
		}
		if(throwCount=2)
		{
			thirdThrow = zone2[i];
			throwCount++;
		}
	}
	}
	if(zone1.length !=0)
	{
	for(var i=0; i<zone1.length; i++)
	{
		if(throwCount=0)
		{
			bestThrow = zone1[i];
			throwCount++;
		}
		if(throwCount=1)
		{
			secThrow = zone1[i];
			throwCount++;
		}
		if(throwCount=2)
		{
			thirdThrow = zone1[i];
			throwCount++;
		}
	}
	}
	
	if((bestThrow.color && secThrow.color && thirdThrow.color )=="blue")
	{
		score=score+bestThrow.zone+secThrow.zone+thirdThrow.zone;
		document.getElementById("blueScore").innerHTML = score;
	}
	else if((bestThrow.color && secThrow.color) == "blue")
	{
		score=score+bestThrow.zone+secThrow.zone;
		document.getElementById("blueScore").innerHTML = score;
	
	}
	else if(bestThrow.color=="blue")
	{
		score=score+bestThrow.zone;
		document.getElementById("blueScore").innerHTML = score;
	}
	
	
	
	if((bestThrow.color && secThrow.color && thirdThrow.color )=="red")
	{
		score=score+bestThrow.zone+secThrow.zone+thirdThrow.zone;
		document.getElementById("redScore").innerHTML = score;
	}
	else if((bestThrow.color && secThrow.color) == "red")
	{
		score=score+bestThrow.zone+secThrow.zone;
		document.getElementById("redScore").innerHTML = score;
	
	}
	else if(bestThrow.color=="red")
	{
		score=score+bestThrow.zone;
		document.getElementById("redScore").innerHTML = score;
	}
}	
function resetBoard(){
	$("#red1").attr("data-x", "");
	$("#red2").attr("data-x", "");
	$("#red3").attr("data-x", "");
	$("#red1").attr("data-y", "");
	$("#red2").attr("data-y", "");
	$("#red3").attr("data-y", "");
	$("#red1").css("transform", "");
	$("#red2").css("transform", "");
	$("#red3").css("transform", "");
	
	$("#blue1").attr("data-x", "");
	$("#blue2").attr("data-x", "");
	$("#blue3").attr("data-x", "");
	$("#blue1").attr("data-y", "");
	$("#blue2").attr("data-y", "");
	$("#blue3").attr("data-y", "");
	$("#blue1").css("transform", "");
	$("#blue2").css("transform", "");
	$("#blue3").css("transform", "");
	moves=0;
}


function keysrt(key) {
  return function(a,b){
   if (a[key] > b[key]) return 1;
   if (a[key] < b[key]) return -1;
   return 0;
  }
}
