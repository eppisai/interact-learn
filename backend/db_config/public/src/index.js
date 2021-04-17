var babu;
$(function() {
  // init elements
  const $play = $("#play");
  const $record = $("#record");
  const $pause = $("#pause");
  $play.attr("disabled", 1);
 

  // Data type for storing a recording
  var recording = { events: [], startTime: -1, htmlCopy: "" };

  // Record each type of event
  const handlers = [
    {
      eventName: "mousemove",
      handler: function handleMouseMove(e) {
        recording.events.push({
          type: "mousemove",
          x: e.pageX,
          y: e.pageY,
          time: Date.now()
        });
      }
    },
    {
      eventName: "click",
      handler: function handleClick(e) {
        recording.events.push({
          type: "click",
          target: e.target,
          x: e.pageX,
          y: e.pageY,
          time: Date.now()
        });
      }
    },
    {
      eventName: "keypress",
      handler: function handleKeyPress(e) {
        recording.events.push({
          type: "keypress",
          target: e.target,
          value: e.target.value,
          keyCode: e.keyCode,
          time: Date.now()
        });
      }
    }
  ];

  var gumStream; 						//stream from getUserMedia()
  var rec; 							//Recorder.js object
  var input; 							//MediaStreamAudioSourceNode we'll be recording
  var au = document.createElement('audio');

  // shim for AudioContext when it's not avb. 
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioContext //audio context to help us record

  // Attach recording button
  $record.toggle(
    function startRecording() {
      // start recording
      $record.text("Recording (Click again to Stop)");
      $play.attr("disabled", 1);
      recording.startTime = Date.now();
      recording.events = [];
      recording.htmlCopy = $(document.documentElement).html();
      recording.height = $(window).height();
      recording.width = $(window).width();
      handlers.map(x => listen(x.eventName, x.handler));

        console.log("recordButton clicked");
        
        var constraints = { audio: true, video:false }

        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
          console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

          audioContext = new AudioContext();

          //update the format 
          document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"

          /*  assign to gumStream for later use  */
          gumStream = stream;
          
          /* use the stream */
          input = audioContext.createMediaStreamSource(stream);

          rec = new Recorder(input,{numChannels:1})

          //start the recording process
          rec.record()

          console.log("Recording started ");

        }).catch(function(err) {
          
        });

    },
    function stopRecording() {
      // stop recording
      $record.text("Record");
      $play.removeAttr("disabled");
      handlers.map(x => removeListener(x.eventName, x.handler));

      console.log("stopButton clicked");
      
      //tell the recorder to stop the recording
      rec.stop();

      //stop microphone access
      gumStream.getAudioTracks()[0].stop();
      console.log(rec);
      rec.exportWAV(createDownloadLink);

    }
  );

  var newWindow;
 
  $play.click(function() {
    function displayWindow() {
      newWindow = window.open("", "newWindow", "width=1693, height=1441");
      newWindow.document.write(recording.htmlCopy);
      newWindow.rec = Object.assign({},recording);
      newWindow.blob = babu;
      // newWindow.document.write(`<script src="https://code.jquery.com/jquery-1.8.3.js"></script>`);
      newWindow.document.write(`
      <script>
      console.log(blob);
      var au = document.createElement('audio');        
        var url = window.URL.createObjectURL(blob);
        var li = document.createElement('li');
        var link = document.createElement('a');

        //name of .wav file to use during upload and download (without extendion)
        var filename = new Date().toISOString();

        //add controls to the <audio> element
        au.controls = false;
        au.src = url;

        //save to disk link
        link.href = url;

        //add the new audio element to li
        li.appendChild(au);
        
        //add the filename to the li
        li.appendChild(document.createTextNode(filename+".wav "))

        //add the save to disk link to li
        li.appendChild(link);
        
        
        li.appendChild(document.createTextNode (" "))//add a space in between
        

        //add the li element to the ol
        recordingsList.appendChild(li);
  
       const fakeCursor = document.createElement('div');
       var iframe = document.getElementById("iframe");
       var compile = document.getElementById("compile");
       var area = document.querySelectorAll('textarea');
       compile.addEventListener("click",function(){
        modal4.style.display = 'block';
        modal_container_4.className = 'modal-container modal-container-four animate__animated animate__zoomIn';
        iframe.srcdoc = area[0].value + "<style>" +
                    area[1].value + "</style>";
       })
      
      var pause = document.getElementById("pause")
      var paused = false;
      pause.addEventListener("click",function(){
        paused=true;
        au.pause();
      })
      let i = 0;
      console.log(rec);
      var SPEED = 1;
      var play = document.getElementById("pa");
      
      var openvideoplayer = document.getElementById("play");
      play.style.display = "block";
      pause.style.display = "block";
      openvideoplayer.style.visibility = "hidden";
      record.style.visibility = "hidden";
      const modal4 = document.getElementById('modal-four');
      const modal_container_4 = document.querySelector('.modal-container-four');
      play.addEventListener("click",function(){
        au.play();
        var cursor = document.getElementsByClassName("cursor");
        for(i = 0; i < cursor.length; i++){
          cursor[i].remove();
        }
        const fakeCursor = document.createElement('div');
        fakeCursor.className = "cursor";
        document.body.appendChild(fakeCursor);
        const startPlay = Date.now();
        paused = false;
        
        var doc = document.documentElement;
        console.log(document.documentElement);
        (function draw() {
      
          let event = rec.events[i];
          if (!event) {
            return;
          }
          let offsetRecording = event.time - rec.startTime;
          let offsetPlay = (Date.now() - startPlay) * SPEED;
          if (offsetPlay >= offsetRecording) {
            drawEvent(event, fakeCursor, doc);
            i++;
          } 
    
          if (i < rec.events.length && !paused) {
            requestAnimationFrame(draw);
          }
          else{
            rec.startTime = event.time;
            var cursor = document.getElementsByClassName("cursor");
            for(i = 0; i < cursor.length; i++){
              cursor[i].remove();
            }
          }
        })();
      })
      const modals = document.querySelectorAll('.modal');
      window.addEventListener('click', (e) => {
      modals.forEach(modal => {
        if(e.target === modal){
            modal.style.display = 'none';
        }
      })
});
      function drawEvent(event, fakeCursor, Doc) {
        if (event.type === "click" || event.type === "mousemove") {
            console.log("mouse");
            fakeCursor.style.top = event.y,
            fakeCursor.style.left = event.x  
        }
    
        if (event.type === "click") {
          console.log("mouseclick");
          flashClass(fakeCursor, "click");
          console.log(event.target.id);
          var tar = document.getElementById(event.target.id);
          flashClass(tar, "clicked");
        }
    
        if (event.type === "keypress") {
          console.log("keypress");
          const path = event.target.id;
          var tar = document.getElementById(path);
          tar.focus();
          tar.value = event.value;
        } 
      }
      function flashClass(el, className) {
        el.classList.add(className);
        setTimeout(function(){ el.classList.remove(className); }, 200);
      }
       
     </script>`)
    }
    console.log(babu)
    const id = 1
    getData(babu) 
    localStorage.setItem("event",JSON.stringify(recording))
    const data = localStorage.getItem("event")
    //localStorage.clear()
    function getData(babu) {
      console.log("WORKS")
      let reader = new FileReader();
      reader.onload = function(event) {
                          
          console.log(reader.result);    
      };
      reader.readAsDataURL(babu);
     
  } 
  
    const res = axios.post('http://localhost:3000/save', {creator:"NTY",event:data})
    
    displayWindow();
  });
});



  function listen(eventName, handler) {
   return document.documentElement.addEventListener(eventName, handler, true);
  }

  function removeListener(eventName, handler) {
    return document.documentElement.removeEventListener(
      eventName,
      handler,
      true
    );
  }

  function createDownloadLink(blob) {
        babu = blob;
        var url = URL.createObjectURL(blob);
        var au = document.createElement('audio');
        var li = document.createElement('li');
        var link = document.createElement('a');

        //name of .wav file to use during upload and download (without extendion)
        var filename = new Date().toISOString();

        //add controls to the <audio> element
        au.controls = true;
        au.src = url;

        //save to disk link
        link.href = url;

        //add the new audio element to li
        li.appendChild(au);
        
        //add the filename to the li
        li.appendChild(document.createTextNode(filename+".wav "))

        //add the save to disk link to li
        li.appendChild(link);
        
        
        li.appendChild(document.createTextNode (" "))//add a space in between
        

        //add the li element to the ol
        recordingsList.appendChild(li);
      } 

    //   function getData(babu) {
    //     console.log("WORKS")
    //     let reader = new FileReader();
    //     reader.onload = function(event) {
    //         var data = event.target.result.split(',');                    // the actual conversion of data from binary to base64 format
    //         //callback(decodedImageData);        
    //     };
    //     reader.readAsDataURL(babu);
    //     console.log(reader)
    //     console.log(FileReader)
    // }