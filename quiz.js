// take the references of the elements

const quizContainer=document.getElementsByClassName("quiz-container")[0];
const quiz=document.getElementsByClassName("quiz")[0];
const previousButton=document.getElementsByClassName("prev-btn")[0];
const nextButton=document.getElementsByClassName('next-btn')[0];
const submitButton=document.getElementsByClassName("submit-btn")[0];
const resultsElement=document.getElementsByClassName('results')[0];
const scoreDiv=document.getElementsByClassName('board');
nextButton.style.backgroundColor='blue';
submitButton.style.backgroundColor='#2fc00f';
const animater=document .getElementsByClassName('animate')[0];



// data
const questions=[
    {
        id:1,
        question:"Yakshagana is a folk dance that belong to the state of______",
        answers:{
            a:"Kerala",
            b:"Karnataka",
            c:"Haryana",
            d:"Rajasthan"
        },
        correctAnswer:"b"
    },
    {
        id:2,
        question:"'Mandarin' is the official language of which neighbouring country of India?",
        answers:{
            a:"Afghanistan",
            b:"Bhutan",
            c:"Sri Lanka",
            d:"China"
        },
        correctAnswer:"d"
    },
    {
        id:3,
        question:"Which river is also known as Tsangpo?",
        answers:{
            a:"Ganga river",
            b:"Gandak river",
            c:"Kaveri river",
            d:"Brahmaputra"
        },
        correctAnswer:"d"
    },
    {
        id:4,
        question:"Articles 29-30 of the Constitution of India deals with",
        answers:{
            a:"Cultural and educational rights",
            b:"Right to freedom",
            c:"Right to equality",
            d:"Right to freedom of religion"
        },
        correctAnswer:"a"
    },
    {
        id:5,
        question:"In which year did Robert Hooke introduce the term 'cell'?",
        answers:{
            a:"1875",
            b:"1675",
            c:"1665",
            d:"1765"
        },
        correctAnswer:"c"
    },
    {
        id:6,
        question:"The scientific study of insects",
        answers:{
            a:"Entomology",
            b:"Alchemy",
            c:"Biology",
            d:"Etymology"
        },
        correctAnswer:"a"
    },
    {
        id:7,
        question:"During the reign of which Mauryan king,the kalinga war was fought?",
        answers:{
            a:"Bindusara",
            b:"Ashoka",
            c:"Chandragupta",
            d:"Dasaratha"
        },
        correctAnswer:"b"
    },
    {
        id:8,
        question: "Which of the following is a classical dance form from Andhra Pradesh?",
        answers:{
            a:"Bharatanatyam",
            b:"Mohiniyattam",
            c:"Kuchipudi",
            d:"Manipuri"
        },
        correctAnswer:"c"
    },
    {
        id:9,
        question:"colour of the flame when magnesium burns in the presence of oxygen?",
        answers:{
            a:"Yellow",
            b:"Red",
            c:"White",
            d: "Green"
        },
        correctAnswer:"c"
    },
    {
        id:10,
        question:"In India,the population census is conducted once every___ ",
        answers:{
            a:"5 years",
            b:"15 years",
            c:"25 years",
            d:"10 years"
        },
        correctAnswer:"d"
    },
    {
        id:11,
        question:"Chemical formula of Calcium Carbonate",
        answers:{
            a:"CaSO4",
            b:"CaCO3",
            c:"CaCo2",
            d:"CaO"
        },
        correctAnswer:"b"
    },
    {
        id:12,
        question:"Which vitamin is also known as Thaiamin?",
        answers:{
            a:"vitamin B1",
            b:"Vitamin B2",
            c:"Vitamin B12",
            d:"Vitamin B3" 
        },
        correctAnswer:"a"
    },
    {
        id:13,
        question:"The Council of states also known as",
        answers:{
            a:"High court",
            b:"Lok Sabha",
            c:"Supreme Court",
            d:"Rajya Sabha"
        },
        correctAnswer:"d"
    },
    {
        id:14,
        question:"the Chemical name of the acid present in Vinegar is called_____",
        answers:{
            a:"nitric acid",
            b:"sulphuric acid",
            c:"formic acid",
            d:"malonic acid" 
        },
        correctAnswer:"b"
    },
    {
        id:15,
        question:"The horizontal rows of squares in chess are called____",
        answers:{
            a:"ranks",
            b:"pawns",
            c:"bishops",
            d:"files"
        },
        correctAnswer:"a"
    },
    {
        id:16,
        question:"_____are present only in plant cells.",
        answers:{
            a:"Mitochondria",
            b:"Nucleus",
            c:"Golgi apparatus",
            d:"Plastids"
        },
        correctAnswer:"d"
    },
    {
        id:17,
        question:"Famous Indian Boxer Mary Kom is from which state?",
        answers:{
            a:"Nagaland",
            b:"Manipur",
            c:"Tamil nadu",
            d:"Mizoram" 
        },
        correctAnswer:"b"
    },
    {
        id:18,
        question:"the country of winds",
        answers:{
            a:"Denmark",
            b:"Czech Republic",
            c:"Germany",
            d:"Poland" 
        },
        correctAnswer:"a"
    },
    {
        id:19,
        question:"Which water body surrounds India in the west?",
        answers:{
            a:"Arabian sea",
            b:"Pacific Ocean",
            c:"Bay of Bengal",
            d:"Indian Ocean" 
        },
        correctAnswer:"a"
    },
    {
        id:20,
        question:"The objective of the first five year plan was to __________",
        answers:{
            a:"promote more education",
            b:"initiate a process of development",
            c:"develop agriculture",
            d:"increase the GDP of India" 
        },
        correctAnswer:"c"
    }
];

const quizSlides=[];
let currentSlide=0;
let quizSubmitted=false;
const answeredByUser=[];

function onNextClick(){
    resultsElement.innerText='';
    quizContainer.removeAttribute('id')
    const upcomingSlideNumber=currentSlide+1;
    if (upcomingSlideNumber<0){
        return;
    }else {
        showSlide(upcomingSlideNumber);
        
    }
}

function onPrevClick() {
    const upcomingSlideNumber = currentSlide - 1;
    if (upcomingSlideNumber < 0) {
        return;
    } else {
        showSlide(upcomingSlideNumber);
    }
}

function regulateNextPrevEnability() {
    if (currentSlide <= 0) {
        previousButton.setAttribute('disabled', 'disabled');
    } else {
        previousButton.removeAttribute('disabled');
    }

    if (currentSlide >= quizSlides.length - 1 || quizSubmitted==false) {
        nextButton.setAttribute('disabled', 'disabled');
    } else {
        nextButton.removeAttribute('disabled');
    }
}



function buildQuiz(){
    questions.forEach(function(question){
        const slideElement=document.createElement('div');
        slideElement.setAttribute('class','slide');

        const questionElement=document.createElement('div');
        questionElement.setAttribute('class','question');
        questionElement.innerText=question.question;

        slideElement.appendChild(questionElement);

        const answersElement=document.createElement('div');
        answersElement.setAttribute('class','answers');
        for (const letter in question.answers){
            const answerElement=document.createElement('div');
            answerElement.setAttribute('class','answer');

            const inputOptionElement=document.createElement('input');
            inputOptionElement.setAttribute('type','radio');
            inputOptionElement.setAttribute('name',`question${question.id}`)
            inputOptionElement.setAttribute('id',letter);
            inputOptionElement.setAttribute('value',question.answers[letter])
            inputOptionElement.setAttribute('onclick','onAnswerClick(event)');

            answerElement.appendChild(inputOptionElement);

            const spanElement=document.createElement('span');
            spanElement.innerText=question.answers[letter];
            
            answerElement.appendChild(spanElement);
            answersElement.appendChild(answerElement);
        }

        slideElement.appendChild(answersElement);

        quizSlides.push(slideElement);

        

    })
}

function changeColor(){
    if (answeredByUser[answeredByUser.length-1].isCorrect){
        scoreButton.style.backgroundColor=' rgb(27, 167, 19)';
        scoreButton.style.color='white';
    }
    else{
        scoreButton.style.backgroundColor='red';
        scoreButton.style.color='white';
    }
}



function onSubmitClick(){ 
    quizSubmitted=true;
    scoreButton=document.getElementById("b"+(answeredByUser[answeredByUser.length-1].questionId));
    changeColor();
    if (answeredByUser[answeredByUser.length-1].isCorrect){
        var displayText='correct';
        resultsElement.innerText=displayText;
        resultsElement.style.backgroundColor='rgb(27, 167, 19)';
        quizContainer.setAttribute('id','celebration')
        quizSubmitted=true;
        nextButton.removeAttribute('disabled'); 

    }
    else{
        resultsElement.removeAttribute('class');
        resultsElement.style.backgroundColor='red';
        resultsElement.setAttribute('class','results')
        animater.setAttribute('id','sad');
        var displayText='incorrect'
        resultsElement.innerText=displayText;
    }
}



function onAnswerClick(ev){
    
    const questionId = ev.target.name.match(/(?<=question).*/gi)[0];

    const existingAnswer = answeredByUser.find(i => i.questionId == questionId);

    const answeredObj = existingAnswer ?? {questionId:questionId} ;
    answeredObj.answerChosen = ev.target.id;
    
    submitButton.removeAttribute('disabled');
   
    if (!existingAnswer) {
        answeredByUser.push(answeredObj);
    }
    markCorrect(answeredObj);

}

function markCorrect(answeredObj){
    const question=questions[answeredByUser.length-1]
    
    if (question.correctAnswer ==answeredObj.answerChosen) {
        answeredObj.isCorrect =true;
    }else{
    answeredObj.isCorrect=false;} 
    
}
function showSlide(slideNumber){
    quizSubmitted=false;
    nextButton.setAttribute('disabled', 'disabled');
    submitButton.setAttribute('disabled','disabled');
    quiz.innerHTML='';
    

    const slide=quizSlides[slideNumber];
    quiz.appendChild(slide);

    currentSlide=slideNumber;
    regulateNextPrevEnability();

}

function initialize(){
    currentSlide=0;
    buildQuiz();
    showSlide(0);

}

initialize();









































































































































