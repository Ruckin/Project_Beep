class ApiAudio {
    constructor(){ 
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)(); // O SEGUNDO ARGUMENTO DO || E PARA O NAVEGADOR SAFARI!
        console.log("construtor");
    }

    /**
     * @returns THIS IS A ASYNC FUNCTION THAT MAKES THE RECORDING
     */
    recordAudio = () =>
    new Promise(async resolve => {
      let StatusBuzzer = false;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];
  
      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });
  
      const start = () => mediaRecorder.start();
  
      const stop = () =>
        new Promise(resolve => {
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            const play = () => audio.play();
            resolve({ audioBlob, audioUrl, play });
          });  
          mediaRecorder.stop();
        });
      resolve({ start, stop });
    });

    sleep = time => new Promise(resolve => setTimeout(resolve, time));

    makeAnalyze = () =>
     new Promise(resolve => {
      var analyser = this.audioContext.createAnalyser();
      analyzer.fftsize =  2048;

      var bufferLength = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      audio.connect(analyzer);

      resolve({ })
     });

}