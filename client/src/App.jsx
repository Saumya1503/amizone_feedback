import amity_logo from './images/amity.png'
import mail from './images/mail.png'
import useAlert from './toastAlert/useAlert';
import axios from 'axios'
import LoadingAnimation from 'react-circle-loading-animation'
import { useState } from 'react';

function App() {

  const [loading, setLoading] = useState(true);

  const { toastAlert } = useAlert();

  const submitContact = async (event) => {

    toastAlert({ msg: "Processing Started !!", type: "info", time:3000 });
    toastAlert({ msg: "Please Wait !!", type: "info", time:3000 });

    setLoading(false);

    event.preventDefault();

    const inputData = {
      "Username":event.target.Username.value,
      "Password":event.target.Password.value,
    }

    const resp = await axios.post("http://localhost:8080/", inputData);
    const {err, msg} = resp.data;

    setLoading(true);

    if(err){
      toastAlert({ msg: "Error !!", type: "error" , time:5000});
      if(err=="Error_Auth") toastAlert({ msg: "Check your Credentials !!", type: "info" , time:5000});
    }
    else {

      toastAlert({ msg: "Success !!", type: "success", time:false });
      toastAlert({ msg: "Check your Feedback Form !!", type: "info", time:false });

      event.target.Username.value = "";
      event.target.Password.value = "";

    }


  };

  return (
    <div className='m-0 pb-0 h-full content-center'>

      <div className='p-2 text-center w-full m-auto bg-blue-800 text-lg font-bold text-gray-200 opacity-80'>
            SAVE YOUR TIME AND EFFORT : )
          </div>
      <div className='text-center items-center text-white bg-slate-800 py-12 max-w-full'>
          
          <img className='h-16 w-14 m-auto' src={amity_logo} alt='Amity Logo'/>
          <div className='text-4xl m-2 mt-6 font-bold'>
            Amizone
          </div>
          <div className='text-xl'>
            Faculty Feedback Automation
          </div>
          <div className='text-md mt-12 text-slate-400'>
            Complete your Feedback Form in just<br/><b>5 SECONDS</b> !!
          </div>
          
      </div>
      
      <div className='py-0 px-0 mx-0 bg-slate-800 h-full text-center '>

        <form
        className='text-center p-10 py-20 pt-4' onSubmit={submitContact}>
          <input className="p-3 m-2 rounded-sm text-white bg-slate-900" type="text" name="Username" placeholder='Amizone User Name' autoComplete="on" required/><br/>
          <input className="p-3 m-2 rounded-sm text-white bg-slate-900" type="text" name="Password" placeholder='Amizone Password'  autoComplete="on" required/><br/><br/>
          <div className='mb-5 text-xl font-bold text-slate-400' hidden={loading}>Processing, Please Wait !!</div>
          <button className='bg-blue-800 p-2 px-8 m-2 rounded-md text-white font-bold' type='submit'>Start Process</button><br/>
        </form>


        <div className='p-10 w-full bottom-0 bg-slate-900 text-white'>
          <text className='text-sm '>If feedback not completed <br/>Check your credentials and Try Again</text>
          <br/><br/>
          <text className='text-md '>All teacher feedbacks are filled with <b>Completely Satisfied</b> and <b>Good</b> as Additional Feedback</text>
          <br/><br/>
          <div className='text-sm '>We desire to help students by saving their time.<br/> 
          <b>Our website is legitimate and take care of your privacy</b><br/>
          Feel free to use our Service<br/>          
          </div>
          <br/>
          <img src={mail} className="h-20 w-20 m-auto" alt="Mail" /><br/>
          <text className='text-md pb-10'>Feel free to contact us at{" "}</text>
          <text className='text-md font-bold pb-10'>amizonefeedback@gmail.com</text>
        </div>

      </div>

    </div>
  )
}

export default App
