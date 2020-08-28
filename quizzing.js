const quiz = document.getElementById('quiz');
const result = document.getElementById('results');
const submit = document.getElementById('submit');
let i=0;
let q=0;
let numcorrect=0;
let answered=0;
const Questions = [
	{
		question: "What does COVID-19 stand for?",
		answers: {
			a: "Coronavirus Disease 19, because it's the 19th strain of coronavirus discovered.",
			b: "Coronavirus Disease 2019, the year it was first identified.",
			c: "As 19 types of Covid Viruses can cause this disease "
		},
		correctAnswer: "b"
	},
	{
		question: "How is COVID-19 passed on?",
		answers: {
			a: "Through droplets that come from your mouth and nose when you cough or breathe out",
			b: "By drinking unclean water",
			c: "Both the above methods"
		},
		correctAnswer: "a"
	},
	{
		question: "What are the common symptoms of COVID-19?",
		answers: {
			a: "Continuous cough",
			b: "Fever",
			c: "Tiredness",
			d: "All of the above"
		},
		correctAnswer: "d"
	},
	{
		question: "Can you always tell if someone has COVID-19?",
		answers: {
			a: "No - not everyone with COVID-19 has symptoms",
			b: "Yes - it will be obvious, a person with COVID-19 coughs a lot",
			c: "Yes - you can tell just by where a person comes from, their race and ethnicity"
		},
		correctAnswer: "a"
	},
	{
		question: "Can washing your hands protect you from COVID-19?",
		answers: {
			a: "Yes - but only if you use a strong bleach",
			b: "Yes - normal soap and water or hand sanitizer is enough",
			c: "No - Washing your hands doesnot stop COVID-19"
		},
		correctAnswer: "b"
	},
	{
		question: "When should fabric face masks be worn?",
		answers: {
			a: "On public transport",
			b: "In confined or crowded spaces",
			c: "In small shops",
			d: "All the above situations"
		},
		correctAnswer: "d"
	},
	{
		question: "Can COVID-19 be cured?",
		answers: {
			a: "Yes-Hot drinks can cure COVID-19",
			b: "No-COVID-19 is a death sentence",
			c: "No-but most people get better by themselves"
		},
		correctAnswer: "c"
	},
	{
		question: "How can people protect themselves from COVID-19?",
		answers: {
			a: "Wash their hands regularly and follow the physical distancing advice",
			b: "Keep taking their antiretroviral treatment",
			c: "Exercise regularly, eat well and look after their mental health",
			d: "All of the above"
		},
		correctAnswer: "d"
	},
	{
		question: "How does weather seem to affect the novel coronavirus?",
		answers: {
			a: "It is not yet known.",
			b: "Cold temperatures can kill the virus.",
			c: "The virus cannot survive in hot, humid climates."
		},
		correctAnswer: "a"
	},
	{
		question: "Which of the following people is COVID-19 more dangerous for? (select all correct responses)",
		answers: {
			a: "Children",
			b: "People aged between 20 to 50",
			c: "People with certain underlying health conditions",
			d: "European people"
		},
		correctAnswer: "b"
	}
]
function checkans(c,n)
{
	console.log(n);
	let x=document.getElementById(n).childNodes;
	let j=0;
	for (j = 0; j < x.length; j++) {
		x[j].style.pointerEvents = 'none';
	}
	c.style.color="white";
	if(c.value==Questions[n]['correctAnswer'])
	{	
		c.style.backgroundColor="green";
		numcorrect++;
	}
	else
		c.style.backgroundColor="red";
	answered++;
	if(answered==10)
		showResults();
}
function buildQuiz(){
	for(i=0;i<10;i++)
	{
		document.querySelector("#previous").style.display="none";
		let no=document.createElement("DIV");
		no.id=i;
		let a=i;
		let q=document.createElement("H4");
		q.id="question";
		q.innerHTML=Questions[i]['question'];
		no.appendChild(q);
		for(letter in Questions[i]['answers'])
		{
			let ans=document.createElement("P");
			let option=document.createElement("BUTTON");
			option.id="ansopt";
			option.value=letter;
			option.onclick=function() {checkans(this,a)};
			let t = document.createTextNode(Questions[i]['answers'][letter]);    // Create a text node
			option.appendChild(t);
			ans.appendChild(option); 
			no.appendChild(ans);
		}
	if(i)
		no.style.display="none";
	quiz.appendChild(no);
	}
	document.querySelector("#qno").innerHTML=q+1+"/10";
}
function startquiz(){
	document.body.style.backgroundColor="white";
	buildQuiz();
	document.querySelector(".header").style.display="none";
	document.querySelector(".quiz-container").style.display="block";
}
function prevq()
{
	if(q==1)
		document.querySelector("#previous").style.display="none";
	document.getElementById(q).style.display="none";
	q--;
	document.querySelector("#qno").innerHTML=q+1+"/10";
	document.getElementById(q).style.display="block";
	if(q<9)
		document.querySelector("#next").style.display="inline-block";
}
function nextq(){
	if(q==8)
		document.querySelector("#next").style.display="none";
	document.getElementById(q).style.display="none";
	q++;
	document.querySelector("#qno").innerHTML=q+1+"/10";
	document.getElementById(q).style.display="block";
	if(q>0)
		document.querySelector("#previous").style.display="inline-block";
}
function showResults(){
	let result=document.getElementById("results");
	document.body.style.backgroundColor="#663399";
	document.querySelector(".quiz-container").style.display="none";
	result.style.display="block";
	document.querySelector("#scoreboard").innerHTML="SCORE:"+numcorrect;
}

submit.addEventListener('click',showResults);


