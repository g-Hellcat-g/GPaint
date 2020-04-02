let canv = document.getElementById('canvas'),
    ctx  = canv.getContext('2d'),
    isMouseDown = false,
    sizeLineWidth,
    optionColor,
    colorP;
    
    function changeSize () {
     sizeLineWidth = parseInt(document.getElementById('sizeLineWidth').value);
    }

   


    canv.width  = window.innerWidth-53;
    canv.height = window.innerHeight-50;

   

   canv.addEventListener('mousedown', function() {
       isMouseDown = true;
   });

   canv.addEventListener('mouseup', function() {
       isMouseDown = false;
       ctx.beginPath();
   })

   function clearCanv () {
    ctx.clearRect(0, 0, canv.width, canv.height );
   }

   function pickColor () {
       colorP = document.getElementById('selectColor').selectedIndex;
       optionColor = document.getElementById('selectColor').options;
       ctx.fillStyle = optionColor[colorP].text;
       ctx.strokeStyle = optionColor[colorP].text;
   }

   
   canv.addEventListener('mousemove',function(e) {
       if(isMouseDown) {
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
   })
    


