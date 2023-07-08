const SectionElement=document.querySelector('.section');
const world=document.querySelector('body');
const restart=document.querySelector('.restart');
const timerdis=document.querySelector('.typingspeed');
const icons=document.querySelectorAll('.styleimg');
const toolTip=document.querySelector('.tooltip');
const header=document.querySelector('.header')
const colors=['#191826','#2E1A47','#0C0D11'];
let colIterator=0;

let count=0;
let bug;
let timming=45;
let html;
let error;
let border;
let text;
let lenght;
let timer;
let start;
let end;
let  random;
let replaceitem;
let check;
let stopfun;
let i=0;
let j;
let countdownstart=0;
let lpm;
let dp;
String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
 
    return this.substring(0, index) + replacement + this.substring(index + 1);
}


function replace()
{
    let x=start;
    let y=end;


    while(x<=y)
    {
    text=text.replaceAt(y+1,text[y]);
    y=y-1;
    }
    text=text.replaceAt(y+1,replaceitem);
    SectionElement.innerHTML='';
    SectionElement.insertAdjacentHTML('afterbegin',text); 
    start=start+1;
    end=end+1;
}


function letstart()
{
    timming=45;
    timerdis.classList.remove('hidden');
    timerdis.textContent=`${timming}`;
    stopfun=setInterval(function()
    {
        timming=timming-1;
        timerdis.textContent=`${timming}`;
        if(timming==0)
{
        clearInterval(stopfun);
        timerdis.classList.add('hidden');
        count=0;
        bug=1;
        // timming=30;
        SectionElement.innerHTML='';
        let value=100-(error/lenght*100);
        if(value<0)
        {
            value=0;
        }
        html=`<div class="done">Accuracy ${(value).toFixed(2)}%</div>`
        SectionElement.insertAdjacentHTML('beforeend',html);
        return;
}


    },1000);
}

init();
function init()
{
    dp=0;
    error=0;
    start=20;
    end=26;
const data=fetch(`https://typingplatform.onrender.com/api/v1/para/getRandom`).then(response=>{
    return response.json();
}).then(data=>{
    const value=data.data[0].para;
    random=Math.floor(Math.random()*51);
    text=`<span class="decor"></span>${value}`;
    SectionElement.innerHTML='';
    SectionElement.insertAdjacentHTML('beforeend',text); 
   border=document.querySelector('.decor');
    lenght=text.length;
    check=value;
});
}

function endingit()
{
    bug=1;
    clearInterval(stopfun);
    timerdis.classList.add('hidden');
    count=0;
    // timming=30;
    SectionElement.innerHTML='';
    let value=100-(error/lenght*100);
    html=`<div class="done">Accuracy ${(value).toFixed(2)}%</div>`
    SectionElement.insertAdjacentHTML('beforeend',html);
}

function ErrorRender()
{
    error=error+1;
            world.style.transition='.3s';
            world.style.backgroundColor='rgb(255, 127, 127)';
            setTimeout(function()
            {
                world.style.backgroundColor=colors[colIterator];
            }, 200);
}
window.addEventListener('keypress',function(e){

    if(bug===1)
    {
        return 
    }
    else{
    if(count===0)
    {
        letstart();
        count=1;
    }
    if(end>lenght-3)
    {
        if(e.key===text[end+1])
        {
       endingit();
        }
        else{
            ErrorRender();

        }
        return;
    }
    else{
    replaceitem=text[end+1];
    if(e.key===replaceitem)
    {
    replace();
    }
    else{
        ErrorRender();
    }
    }
}
})

restart.addEventListener('click',function()
{
    count=0;
    bug=0;
    timerdis.classList.add('hidden');
    clearInterval(stopfun);
    init();
});


icons.forEach((data)=>{
    data.addEventListener("mouseover",(e)=>{


        const leftGap=e.srcElement.getBoundingClientRect().left;

        const hedGap=header.getBoundingClientRect().left;
        
        const eltHovered=e.srcElement.classList[1];
        toolTip.style.left=`${leftGap-hedGap-50}px`

        if(eltHovered==='icon1')
        {
            toolTip.innerHTML='toggleTheme<div class="triangle-down"></div>'
        }
        else if(eltHovered==='icon2')
        {
            toolTip.innerHTML=`you'r improving<div class="triangle-down"></div>`
        }
        else if(eltHovered==='icon3'){
            toolTip.innerHTML='Click to logout<div class="triangle-down"></div>'
        }

        toolTip.classList.remove('hidden')
    })

    data.addEventListener("click",(e)=>{
        const eltHovered=e.srcElement.classList[1];
        
        if(eltHovered==='icon1')
        {
            colIterator=(colIterator+1)%3;
            world.style.backgroundColor=colors[colIterator];
        }
        else if(eltHovered==='icon3')
        {
            
         fetch(`https://typingplatform.onrender.com/api/v1/users/deleteMe`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
        }).then((data)=>{

            if(data.ok===true)
            {
                window.location.replace(`https://typingplatform.onrender.com/signup`)
            }
        })
    }
        
    })

    data.addEventListener('mouseout',(e)=>{
        toolTip.innerHTML='';
        toolTip.classList.add('hidden');
    })
})