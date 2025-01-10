
import './App.css';
import react, {useState} from 'react';
import { useSession, useSupabaseClient, useSessionContext }  from '@supabase/auth-helpers-react';
/*import DateTimePicker from 'react-datetime-picker';*/
import logo from './logos/rose_logo.svg';
import logo1 from './logos/bag_logo.svg';
import logo2 from './logos/bouquet_logo.svg';
import logo3 from './logos/card_logo.svg';
import logo4 from './logos/chocolate_logo.svg';
import logo5 from './logos/couples_logo.svg';
import logo6 from './logos/gift_logo.svg';
import logo7 from './logos/heart_logo.svg';
import logo8 from './logos/pheart_logo.svg';


const App = () => {
  /*   const [start,setStart] = useState(newDate()); */

  const session = useSession(); //tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase
  const { isLoading } = useSessionContext();

  const [text,setText] = useState("Yes");
  const [text1,setText1] = useState("No");

  const logos = [logo, logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];
  const texts = ["Please!", "I'm begging you", "Seriously?", "Come On!", "Baby, Please!", "Yes!, HA!", "Ye..., Nope"]
  
  const [currentLogo,setCurrentLogo] = useState(logo);

  const changeLogo = () => {
      const randomIndex = Math.floor(Math.random() * logos.length);
      setCurrentLogo(logos[randomIndex]);
      const randomText = Math.floor(Math.random() * texts.length);
      setText1(texts[randomText])
      
  };
  
  async function googleSignIn() {
    const { error }  = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
    if(error) {
      alert('Error loggin in to Google provider with Supabase');
      console.log(error)
    }
  };
    
  async function signOut() {
    await supabase.auth .signOut();
  }
    
  if(isLoading) {
    return <></>
  }

  /* const [ start, setStart ] = useState(newDate()) */




  return (
    <div className="App">
      <header className="App-header">
        <img src={currentLogo} className="App-logo" alt="logo" />
        <h3>
          Will You be my Valentine?
        </h3>
        <div className="container">
        <button className="button1" onClick={() => setText("Woohoo!!!")}>
          {text}
        </button>
        <button className="button2" onClick={changeLogo}>
          {text1}
        </button > 
        </div>
        <div style={{width: '200px', margin: '10px auto'}}>
          {session ?
            <>
              <h3>Add our date to your Google Calendar {'<3'} {session.user.login}</h3>
              <button>
                Add to Google Calendar
              </button>
              <button onClick={() => signOut()}>
                Sign Out
              </button>
            </>
            :
            <>
              <button onClick={() => googleSignIn()}>
                Sign In with Google
              </button>
            </>
          }  
        </div>
      </header>
    </div>

  );
}

export default App;
