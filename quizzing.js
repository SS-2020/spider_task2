const quiz = document.getElementById('quiz');
const result = document.getElementById('results');
const submit = document.getElementById('submit');
let uname =document.getElementById("play");
let minuteLabel = document.getElementById("min");
let secondsLabel = document.getElementById("sec");
let min = 0,sec=0;
let sm;
let ss;
let i=0;
let q=0;
let score=0;
let numcorrect=0;
let answered=0;
let Questions=[];
const Questionset = [
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
		correctAnswer: "c"
	}
]
function setTime()
{
    ++min;
    minuteLabel.innerHTML = 10-min;
}

function setsec()
{
    ++sec;
	let s=59-pad(sec%60);
	secondsLabel.innerHTML = 59-pad(sec%60);
	if((min==10)&&(s==0))
		showResults();
}

function pad(val)
{
    var valString = val + "";
	if(valString.length < 1)
	{
	return "0" + valString;
	}else{
        return valString;
    }
}
function checkans(c,n)
{
	console.log(n);
	let x=document.getElementById(n).childNodes;
	let tab=document.getElementById(n+11);
	let j=0;
	for (j = 0; j < x.length; j++) {
		x[j].style.pointerEvents = 'none';
	}
	c.style.color="white";
	if(c.value==Questions[n]['correctAnswer'])
	{	
		c.style.backgroundColor="green";
		tab.style.backgroundColor="green";
		numcorrect++;
		score+=5;
	}
	else
	{
		c.style.backgroundColor="red";
		tab.style.backgroundColor="red";
		score-=2;
	}
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
function shuffle(array) {
    var i = array.length,j = 0,temp;
    while (i--) {
		j = Math.floor(Math.random() * (i+1));
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
    }
    return array;
}
function startquiz(){
	if(uname.value=='');
	else{
	localStorage.setItem("user", uname.value);
	Questions=shuffle(Questionset);
	sm=setInterval(setTime,60000);
	ss=setInterval(setsec,1000);
	document.body.style.backgroundColor="white";
	buildQuiz();
	let m=0;
	for(m=0;m<2;m++)
	{
		let row=document.createElement("TR");
		let d=0;
		for(d=0;d<5;d++)
		{	
			let col=document.createElement("TD");
			col.innerHTML=m*5+d+1;
			col.id=m*5+d+11;
			col.onclick=function(){moveto(col.id)};
			col.style.backgroundColor="white";
			row.appendChild(col);
		}
		document.getElementById("navbox").appendChild(row);
	}
	document.getElementById(11).style.backgroundColor="blue";
	document.querySelector(".header").style.display="none";
	document.querySelector(".quiz-container").style.display="block";
	}
}
function prevq()
{
	document.getElementById(q).style.display="none";
	q--;
	document.querySelector("#qno").innerHTML=q+1+"/10";
	document.getElementById(q).style.display="block";
	check();
}
function moveto(n)
{
	document.getElementById(q).style.display="none";
	q=n-11;
	document.querySelector("#qno").innerHTML=q+1+"/10";
	document.getElementById(q).style.display="block";
	check();
}
function check()
{
	if(q==0)
		document.querySelector("#previous").style.display="none";
	else
		document.querySelector("#previous").style.display="inline-block";
	if(q==9)
		document.querySelector("#next").style.display="none";
	else
		document.querySelector("#next").style.display="inline-block";
	if(document.getElementById(q+11).style.backgroundColor=="white")
		document.getElementById(q+11).style.backgroundColor="blue";
}
function nextq(){
	document.getElementById(q).style.display="none";
	q++;
	document.querySelector("#qno").innerHTML=q+1+"/10";
	document.getElementById(q).style.display="block";
	check();
}
class scr 
{
  constructor(name,score)
  {
    this.name=name;
    this.score=score;
	this.date=new Date().toString().substr(4,21);
  }
}
window.onload
{
  getlist();
}
function getlist()
{
  scores=JSON.parse(localStorage.getItem("scores"));
  if(!scores)
  {
    scores=[];
  }
}
let mn1 , sc1 , si , mn2 , sc2 , sj , ni , nj , lgt ;
function sort (arr)
{
  lgt=arr.length;
  for(let i=0;i<lgt;i++)
  {
    for(let j=i+1;j<lgt;j++)
    {
      let itj=arr[j].score;
	  let iti=arr[i].score;
      if(iti<itj)
      {
        ni=arr[i].name;
        nj=arr[j].name;
        arr[i].name=nj;
        arr[j].name=ni;
		ni=arr[i].date;
        nj=arr[j].date;
        arr[i].date=nj;
        arr[j].date=ni;
        arr[j].score=iti;
        arr[i].score=itj;
      }
    }
  }
}
function updat(uname)
{
	const p=new scr(uname,score);
    scores.push(p);
    sort (scores);
    let str=JSON.stringify(scores);
    localStorage.setItem("scores",str);
}
function showResults(){
	clearInterval(ss);
	clearInterval(sm);
	let result=document.getElementById("results");
	document.body.style.backgroundColor="#663399";
	document.querySelector(".quiz-container").style.display="none";
	result.style.display="block";
	updat(uname.value);
	document.querySelector("#scoreboard").innerHTML="Name:"+uname.value+"<br>SCORE:"+score;
	let listn=document.querySelector(".highscore");
	listn.innerHTML="HIGH SCORES";
	let h=5;
    if(scores.length<h)
      h=scores.length;
    for(let i=0;i<h;i++)
    {
      let nm=scores[i].name;
      let sr=scores[i].score;
	  let dt=scores[i].date;
      let node=document.createElement('p');
      node.innerHTML=i+1+". "+nm+":"+sr+" ["+dt+"]";
      listn.appendChild(node);
    }
}

submit.addEventListener('click',showResults);


