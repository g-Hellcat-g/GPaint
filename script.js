let canv = document.getElementById('canvas'),
    ctx  = canv.getContext('2d'),
    isMouseDown = false,
    sizeLineWidth,
    optionColor,
    colorP,
    coords = [];
    
    function changeSize () {
     sizeLineWidth = parseInt(document.getElementById('sizeLineWidth').value);
    }

   


    canv.width  = window.innerWidth*0.94;
    canv.height = window.innerHeight-50;

   

   canv.addEventListener('mousedown', function() {
       isMouseDown = true;
   });

   canv.addEventListener('mouseup', function() {
       isMouseDown = false;
       ctx.beginPath();
       coords.push('mouseup');
   });


   function save () {
       localStorage.setItem('coords', JSON.stringify(coords));
   }


   function clearCanv () {
    ctx.clearRect(0, 0, canv.width, canv.height );
   }

   function replay() {
       let timer = setInterval(function() {
           if ( !coords.length ) {
               clearInterval(timer);
               ctx.beginPath();
               return;
           }

           let crd = coords.shift(),
                 e = {
                     clientX: crd["0"],
                     clientY: crd["1"]
                 };

                 pickColor();
                 ctx.lineWidth = sizeLineWidth;
             
                 ctx.lineTo(e.clientX, e.clientY);
                 ctx.stroke();   
                 
                 ctx.beginPath();
                 ctx.arc(e.clientX, e.clientY, sizeLineWidth/2, 0, Math.PI * 2);
                 ctx.fill();
                 
                 ctx.beginPath();
                 ctx.moveTo(e.clientX, e.clientY);
       }, 30);
   }
 
   function pickColor () {
       colorP = document.getElementById('selectColor').selectedIndex;
       optionColor = document.getElementById('selectColor').options;
       ctx.fillStyle = optionColor[colorP].text;
       ctx.strokeStyle = optionColor[colorP].text;
   }

   
   canv.addEventListener('mousemove',function(e) {
       if(isMouseDown) {
           coords.push([e.clientX, e.clientY]);
            pickColor();
            ctx.lineWidth = sizeLineWidth;
        
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();   
            
            ctx.beginPath();
            ctx.arc(e.clientX, e.clientY, sizeLineWidth/2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);
       }
   });

   document.addEventListener('keydown', function(e) {
    if ( e.keyCode == 83 ) {
        //save
        save();
        console.log('Saved');
    }

    if ( e.keyCode == 82) {
        //replay
        console.log('Replaying ...');
        
        coords = JSON.parse(localStorage.getItem('coords'));

        clearCanv();

        replay();
    }

    if ( e.keyCode == 67) {
        //clears
        clearCanv();
        console.log('Cleared');
    }
});
    


