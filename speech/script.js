  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  let p = document.createElement("p");
  const words = document.querySelector('.words');

  words.append(p);

  recognition.addEventListener("result", e => {
      const ts = Array.from(e.results).map((d) => d[0]).map((f) => f.transcript).join("");

      words.querySelector('p:last-of-type').innerHTML = ts;
  });

  recognition.start();

  recognition.addEventListener("end", (e) => {
      recognition.start();
      let p = document.createElement("p");
      words.appendChild(p);
    //   console.log(e);
  });

  words.addEventListener("input", e => console.log(e));

  document.addEventListener("dblclick", (e) => words.innerHTML = "");