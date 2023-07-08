import { login } from "./script/login.js";
import { signIn } from "./script/signin.js";
const loginBtn=document.querySelector('.login-sumbmit-btn');
const signinBtn=document.querySelector('.signup-sumbmit-btn');




if(loginBtn)
{
    const username=document.querySelector('.inp1')
    const password=document.querySelector('.inp2');

    loginBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        const usernameVal=username.value;
        const passwordVal=password.value;

        if(!username || !passwordVal)
        {
            alert('Please enter valid password or email');
            return;
        }

        username.value='';
        password.value=''

        loginBtn.value='loading....';
        login(usernameVal,passwordVal);
    })
}

if(signinBtn)
{
    
    const name=document.querySelector('.name_id')
    const email=document.querySelector('.email_id')
    const password=document.querySelector('.password_id');

    signinBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        const nameVal=name.value;
        const emailVal=email.value;
        const passVal=password.value;

        if(!nameVal || !emailVal|| !passVal)
        {
            alert('Please enter valid password or email');
            return;
        }

        name.value='';
        email.value='';
        password.value=''

        signinBtn.value='loading....';
        signIn(nameVal,emailVal,passVal);
    })

}