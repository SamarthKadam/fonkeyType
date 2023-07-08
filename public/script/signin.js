import { statusSeek } from "./status.js";
const signBtn=document.querySelector('.signup-sumbmit-btn');
export const signIn=async(name,email,password)=>{

    const data={
        "name":`${name}`,
        "email":`${email}`,
        "password":`${password}`,
    }

 try{
  const res= await axios({
    method:'POST',
    url:`https://typingplatform.onrender.com/api/v1/users/signup`,
    data
  });
 if(res.data.status==='success')
 {
  statusSeek("Account Created",'success');
  window.setTimeout(()=>{
     location.assign('/home');
 },1500)
 }

}catch(err)
{
    signBtn.value='SIGN UP'
  statusSeek("Something went wrong",'fail');
}

}