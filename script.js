  
    // Canvas setup
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    let trainBox = 3; // Maximum length of the trail
    const playbt = document.getElementById("play");
    const restartbt = document.getElementById("restart");
    let a=0;
    let isPlaying = false;

    const score = document.getElementById("score");

    // Movement speed
    let speed = 10;
function restart() {
            playerX = 50; // Reset position
          playerY = 50;
          trail = []; // Clear trail
          dx = speed; // Reset direction to right
          dy = 0;
          trainBox =3; // Reset trail length limit
          restartbt.style.display = "none";
          playbt.style.display = "block";
};

    function playbtn() {
if(playbt.innerText == "Play"){
  playbt.innerText = "Pause";
  isPlaying = true;
  if(a==0){
    dx = speed;
  }else if( a==1){
    dy = -speed;
  }else if( a==2){
    dx = speed;
  }else if( a==3){
    dy = speed;
  }else if( a==4){
    dx = -speed;
  }
}else{
  playbt.innerText = "Play";
  isPlaying = false;
  dx = 0;
  dy = 0;
}

    };
    
    setInterval(function () {
 if (isPlaying) {
    update();
  }          draw();
        }, 200);


    // Player starting position and size
    var playerX = 50;
    var playerY = 50;
    var size = 10; // size of player block


    // Direction (starts by moving right)
    var dx = 0;
    var dy = 0;

    // Trail array to store the player's path
    var trail = [];


    let dot = {
      x: Math.floor(Math.random() * (canvas.width / size)) * size,
      y: Math.floor(Math.random() * (canvas.height / size)) * size
    };

    // Function to draw player and trail
    function draw() {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the trail
      ctx.fillStyle = "#5fa2fa";
      for (var i = 0; i < trail.length; i++) {
        var t = trail[i];
        ctx.fillRect(t.x, t.y, size, size);
      }

      // Draw the player
      ctx.fillStyle = "blue";
      ctx.fillRect(playerX, playerY, size, size);

      // Draw the dot
      ctx.fillStyle = "red";
      ctx.fillRect(dot.x, dot.y, size, size);
    }

    // Function to update player position
    function update() {
          score.innerText = trainBox - 3; // Initial score

      // Move player
      playerX += dx;
      playerY += dy;

      // Add current position to trail
      trail.push({ x: playerX, y: playerY });

      // If player goes outside canvas, stop the game
      if (
        playerX < 0 || playerX > canvas.width - size ||
        playerY < 0 || playerY > canvas.height - size
      ) {
        // alert("Game Over! You went out of bounds.");
        // playerX = 50; 
        // playerY = 50;
        // trail = [];  
        // dx = speed;  
        // dy = 0;
        // trainBox =3;  
                  restartbt.style.display = "block";
          playbt.style.display = "none";
return; // Stop the game
      };
      for (var i = 0; i < trail.length -1; i++) {
        var t = trail[i];
        if (
          playerX === t.x && playerY === t.y 
        ) {
          // alert("Game Over! You have attacked yourself.");
          restartbt.style.display = "block";
          playbt.style.display = "none";
          // playerX = 50;  
          // playerY = 50;
          // trail = [];  
          // dx = speed;  
          // dy = 0;
          // trainBox =3; 
          return;
        }
      }

      // Limit the trail length to avoid memory issues
      if (trail.length > trainBox) {
        trail.shift(); // Remove the oldest position
      }

      // Check if player has reached the dot
      if (playerX === dot.x && playerY === dot.y) {
        // Generate a new dot position
        dot.x = Math.floor(Math.random() * (canvas.width / size)) * size;
        dot.y = Math.floor(Math.random() * (canvas.height / size)) * size;

        // Increase the trail length limit
        trainBox += 1; // Increase the maximum length of the trail
      };
    };

    // Change direction on key press
    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -speed;
        a = 1;
      } else if (event.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = speed;
        a = 3;
      } else if (event.key === "ArrowLeft" && dx === 0) {
        dx = -speed;
        dy = 0;
        a = 4;
      } else if (event.key === "ArrowRight" && dx === 0) {
        dx = speed;
        dy = 0;
        a = 2;
      }
    });


    let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", function (event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

document.addEventListener("touchend", function (event) {
  let touchEndX = event.changedTouches[0].clientX;
  let touchEndY = event.changedTouches[0].clientY;

  let dxSwipe = touchEndX - touchStartX;
  let dySwipe = touchEndY - touchStartY;

  if (Math.abs(dxSwipe) > Math.abs(dySwipe)) {
    // Horizontal swipe
    if (dxSwipe > 0 && dx === 0) {
      dx = speed;
      dy = 0;
    } else if (dxSwipe < 0 && dx === 0) {
      dx = -speed;
      dy = 0;
    }
  } else {
    // Vertical swipe
    if (dySwipe > 0 && dy === 0) {
      dx = 0;
      dy = speed;
    } else if (dySwipe < 0 && dy === 0) {
      dx = 0;
      dy = -speed;
    }
  }
});

    // Game loop
  
