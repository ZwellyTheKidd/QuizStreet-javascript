var quiz = {
    // (A) PROPERTIES
    // (A1) QUESTIONS & ANSWERS
    // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
    data: [
    {
      q : "Which country invented tea??",
      o : [
        "China",
        "UK",
        "Tanzania",
        "DRC"
      ],
      a : 1 //"China" // arrays start with 0, so answer is 70 meters
    },
    {
      q : "Which country is responsible for giving us pizza and pasta?",
      o : [
        "South Africa",
        "Brazil",
        "Italy",
        "Zimbabwe"
      ],
      a : 3 //"Italy"
    },
    {
      q : "Which organ has four chambers?",
      o : [
        "The liver",
        "The heart",
        "The kidney",
        "The intestines"
      ],
      a : 2//"The heart"
    },
    {
      q : "How many tails does a Manx cat have?",
      o : [
        "1",
        "2",
        "3",
        "0"
      ],
      a : 0//None
    },
    {
      q : "Which is the largest ocean on Earth?",
      o : [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean"
      ],
      a : 3
    },
    {
      q : "Which is the largest ocean on Earth?",
      o : [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean"
      ],
      a : 3
    },
    {
      q : "Which is the largest ocean on Earth?",
      o : [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean"
      ],
      a : 3
    }
    ],
  
    // (A2) HTML ELEMENTS
    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper
  
    // (A3) GAME FLAGS
    now: 0, // current question
    score: 0, // current score
  
    // (B) INIT QUIZ HTML
    init: () => {
      // (B1) WRAPPER
      quiz.hWrap = document.getElementById("quizWrap");
  
      // (B2) QUESTIONS SECTION
      quiz.hQn = document.createElement("div");
      quiz.hQn.id = "quizQn";
      quiz.hWrap.appendChild(quiz.hQn);
  
      // (B3) ANSWERS SECTION
      quiz.hAns = document.createElement("div");
      quiz.hAns.id = "quizAns";
      quiz.hWrap.appendChild(quiz.hAns);
  
      // (B4) GO!
      quiz.draw();
    },
  
    // (C) DRAW QUESTION
    draw: () => {
      // (C1) QUESTION
      quiz.hQn.innerHTML = quiz.data[quiz.now].q;
  
      // (C2) OPTIONS
      quiz.hAns.innerHTML = "";
      for (let i in quiz.data[quiz.now].o) {
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz";
        radio.id = "quizo" + i;
        quiz.hAns.appendChild(radio);
        let label = document.createElement("label");
        label.innerHTML = quiz.data[quiz.now].o[i];
        label.setAttribute("for", "quizo" + i);
        label.dataset.idx = i;
        label.addEventListener("click", () => { quiz.select(label); });
        quiz.hAns.appendChild(label);
      }
    },
  
    // (D) OPTION SELECTED
    select: (option) => {
      // (D1) DETACH ALL ONCLICK
      let all = quiz.hAns.getElementsByTagName("label");
      for (let label of all) {
        label.removeEventListener("click", quiz.select);
      }
  
      // (D2) CHECK IF CORRECT
      let correct = option.dataset.idx == quiz.data[quiz.now].a;
      if (correct) {
        quiz.score++;
        option.classList.add("correct");
      } else {
        option.classList.add("wrong");
      }
  
      // (D3) NEXT QUESTION OR END GAME
      quiz.now++;
      setTimeout(() => {
        if (quiz.now < quiz.data.length) { quiz.draw(); }
        else {
          quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
          quiz.hAns.innerHTML = "";
        }
      }, 10);
    },
  
    // (E) RESTART QUIZ
    reset : () => {
      quiz.now = 0;
      quiz.score = 0;
      quiz.draw();
    }
  };
  window.addEventListener("load", quiz.init);
  