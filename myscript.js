let currentQuestion = 0;
let score = 0;
let timeLeft = -1;
let timer; //this will be the timer function

let numHintsLeft = 3; //allows user to see 3 hints

let questions = [
   {
	"question": "1: Which Car brand has this logo? ",
	"a": "Alpha Romeo",
	"b": "Ford",
	"c": "VW",
	"d": "Citr&#246;en",
	"image":"images/q1.jpg",
	"answer": "d",
	"hint": "It is a French Car Company.",
	"fact": "Did you know that a Citr&#246;en was the first car ever to cross the Sahara Desert?"
   },
   {
	"question": "2: Which Car brand has this logo? ",
	"a": "Acura",
	"b": "Geely",
	"c": "Lexus",
	"d": "Honda",
	"image":"images/q2.jpg",
	"answer": "a",
	"hint": "Luxury devision of Honda",
	"fact": "Fun fact, Acura was the first car company to build an all aluminium vehicle."
   },
   {
	"question": "3: Which Car brand has this logo?",
	"a": "Subaru",
	"b": "Saturn",
	"c": "&#352;koda",
	"d": "Chevrolet",
	"image":"images/q3.jpg",
	"answer": "b",
	"hint": "The logo is a cross scetion of a planet.",
	"fact": "Did you know that Saturn produced GM's first EV?"
   },
   {
	"question": "4: Which Car brand has this logo?",
	"a": "Geely",
	"b": "Jeep",
	"c": "Fiat",
	"d": "Hyundai",
	"image":"images/q4.jpg",
	"answer": "a",
	"hint": "The company was founded in China.",
	"fact": "Interestingly, even though most people have never heard of Geely, they sold over 1.3 Milion vehicles last year."
   },
   {
	"question": "5: Which Car brand has this logo?",
	"a": "Ferrari",
	"b": "Seat",
	"c": "Peugeot",
	"d": "Opel",
	"image":"images/q5.jpg",
	"answer": "c",
	"hint": "Peugeot makes pepper grinders.",
	"fact": "Did you know that the first Peugeot car only had three wheels?"
	
   },
   {
	"question": "6:Which Car brand has this logo?",
	"a": "Volvo",
	"b": "Audi",
	"c": "BMW",
	"d": "Suzuki",
	"image":"images/q6.jpg",
	"answer": "b",
	"hint": "Audi is latin for 4.",
	"fact": "Did you know that Audi was the first company to crash text their cars?"
	
   },
   {
	"question": "7: Which Car brand has this logo?",
	"a": "Porsche",
	"b": "Toyota",
	"c": "GMC",
	"d": "Ferrari",
	"image":"images/q7.jpg",
	"answer": "d",
	"hint": "Ferrari is famous for using red for its cars.",
	"fact": "Fun Fact: Ferrari's prancing horse logo is a nod to an Italian flying ace in WWI"
   },
   {
	"question": "8:Which Car brand has this logo?",
	"a": "Mitsubishi",
	"b": "Mazda",
	"c": "Land Rover",
	"d": "Smart",
	"image":"images/q8.jpg",
	"answer": "a",
	"hint": "Mitsu means 3 in Japanese",
    "fact": "Did you know Mitsubishi's logo was inspired by a water chestnut?"
   },
   {
	"question": "9: Which Car brand has this logo?",
	"a": "Lincon",
	"b": "Maserati",
	"c": "Cadillac",
	"d": "Pontiac",
	"image":"images/q9.jpg",
	"answer": "c",
	"hint": "American Luxury cars",
    "fact": "Did you know that Al Capone was one of Cadillac's biggest fans?"
   },
   {
	"question": "10: Which Car brand has this logo?",
	"a": "Lada",
	"b": "Jaguar",
	"c": "Infinity",
	"d": "Renaut",
	"image":"images/q10.jpg",
	"answer": "a",
	"hint": "Famously indestructible russian cars",
    "fact": "Funnily, you can never get a speeding ticket in one of these Russian soapboxes"
   },
 ];
 
 //loading the service worker
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
 
 
 function loadQuestion() {
     
	 //if a timer is running from a previous question, stop it
	 if (timeLeft >= 0) {
		clearInterval(timer); 
	 }
	 
	 
    // close light box for first question
    if (currentQuestion == 0) {
       closeLightBox();
       closeHintBox();
    }
     
    // load the image
    let img = document.getElementById("image");
    img.src = questions[currentQuestion].image;
    img.style.maxWidth = "70vh";
	img.style.maxHeight = "80vh";
    
    // load the question and answers
    document.getElementById("question").innerHTML = questions[currentQuestion].question;
    document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
    document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
    document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
    document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;
 } // loadQuestion
 
 
 function markIt(ans) {
     
    let message = "";
    
    if (ans == questions[currentQuestion].answer) {
        
       // add 1 to score
       score++;
       
       // display score 
       document.getElementById("score").innerHTML = score + " / " + questions.length;
       
       message = "Correct! Your score is " + score + " / " + (currentQuestion+1) + "<br>" + questions[currentQuestion].fact;
    } else {
       message = "Incorrect :< Your score is " + score + " / " + (currentQuestion+1) + "<br> The correct answer was: " + questions[currentQuestion].answer; 
    } // else
        

    // move to the next question
    currentQuestion++;
    if (currentQuestion >= questions.length) {
       // create a special messages
        if (score < 4 ) {
            message = "You really need to pay more attention to the cars on road. <br> You got " + score + " / " + questions.length;
        } 
        else if (score == 4 || score == 5) {
            message = "You are still below average but at least you got some easy ones <br> You got " + score + " / " + questions.length;
        } 
        else if (score == 6 ||score == 7) {
            message = "You are pretty average, know a little but not much <br> You got " + score + " / " + questions.length;
        }
        else if (score == 8 ||score == 9) {
            message = "You did pretty good, you must be knowledgeable about cars  <br> You got " + score + " / " + questions.length;
        }
        else if (score > 9 ) {
            message = "You must be a car nerd. Well done.<br> You got " + score + " / " + questions.length;
        }
        
        
       clearInterval(timer);
    } else {
       loadQuestion();
    }
    
    // show the lightbox
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;
  
 }  // markIt
 

 function closeLightBox() {
    document.getElementById("lightbox").style.display = "none";
     
	//if a new question is loaded, start timer when light box closes
	if(currentQuestion < questions.length) {
		startTimer();
	}
    
 } // closeLightbox
 
 
 //start the timer for the current question
 function startTimer() {
	timeLeft = 15; //seconds
	timer = setInterval( function(){
		document.getElementById("countdown").innerHTML = timeLeft;
		timeLeft--;
		
        
		if (timeLeft <= -1) {
			clearInterval(timer);
			
			//show lightbox
			let message = "Out of Time, Click anwhere to move to the next question";
			document.getElementById("lightbox").style.display = "block";
            document.getElementById("message").innerHTML = message;
			currentQuestion++;
            loadQuestion();

		}
		
	}, 1000);
 } //start timer
 
 function showHint() {
	 let hintmessage = "";
	 
	 if (numHintsLeft > 0) {
	   //get hint from current question
	   message =  questions[currentQuestion].hint;
	   numHintsLeft--;//subtracts 1 from numHintsLeft
	 } else {
	   message = "Sorry, You have used all your hints";
	 }
	 
	 //unhide light box displaying the hint
	 // show the lightbox
    document.getElementById("hintbox").style.display = "block";
    document.getElementById("hintmessage").innerHTML = message;
	 
	 
	 document.getElementById("hintNum").innerHTML = numHintsLeft;
 } //showHint
 

 function closeHintBox() {
     document.getElementById("hintbox").style.display = "none";
 }
 
 
 
 
   
