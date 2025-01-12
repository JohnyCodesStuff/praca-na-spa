
import './App.css';
import react, {useState} from 'react';
import { useSession, useSupabaseClient, useSessionContext }  from '@supabase/auth-helpers-react';
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
  const start = new Date('February 14, 2025 5:00:00'); 
  const end = new Date('February 14, 2025 6:00:00'); 
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const session = useSession(); //tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase
  const { isLoading } = useSessionContext();

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
  
  const woohoo = () => {
      alert('Woohoo!!!! Now scroll down and Log Into your Google Account to create an event');
  }

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
  
  async function createCalendarEvent() {
    console.log('Creating calendar Event');
    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': start.toISOString(), 
        'timeZone': Intl.DateTimeFormat().resolvedOptions,
      },
      'end': {
        'dateTime': end.toISOString(), 
        'timeZone': Intl.DateTimeFormat().resolvedOptions,
      }

    }
    await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization':'Bearer ' + session.provider_token
      },
      body: JSON.stringify(event)
    }).then((data) =>{
      return data.json();
    }).then((data) =>{
      console.log(data);
      alert('Event created, check your Google Calendar!');
    })

  }

  async function signOut() {
    await supabase.auth.signOut();
  }
    
  if(isLoading) {
    return <></>
  }
 
  console.log(session);
  console.log(start);
  console.log(eventName);
  console.log(eventDescription);

  return (
    <div className="App">
      <header className="App-header">
        <img src={currentLogo} className="App-logo" alt="logo" />
        <h3>
          Will You be my Valentine?
        </h3>
        <div className="container">
        <button className="button1" onClick={woohoo}>
          {'Yes'}
        </button>
        <button className="button2" onClick={changeLogo}>
          {text1}
        </button > 
        </div>
        <div style={{width: '200px', margin: '10px auto'}}>
          {session ?
            <>
              <h3>Add our date to your Google Calendar {'<3'} {session.user.login}</h3>
              <p>Name of your event</p>
              <input type='text' onChange={(e) => setEventName(e.target.value)}/>
              <p>Description of your event</p>
              <input type='text' onChange={(e) => setEventDescription(e.target.value)}/>
              <p></p>
              <button onClick={createCalendarEvent}>
                Add to Google Calendar
              </button>
              <p></p>
              <button onClick={() => signOut()}>
                Sign Out
              </button>
              <p></p>
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
