function ProfilePicture(props) {
  return <img className="dp" src={"./assets/dp.jpg"} />;
}

function Header(props) {
  return (
    <div className={props.section}>
    {props.text}</div>
  );
}

function MainHeader(props) {
  return (
    <div className={props.section}>
      <div className="s1">
        {"My name is George and I study Computer Science at the "} 
      <span id='uwaterloo'>{'University of Waterloo'}</span> {'.'}
      </div>
      <div className="s2">
        {"In addition to my personal projects, I've completed internships as a Full-Stack Web Developer in Fintech and as a QA Engineer at the 2nd fastest growing software company."}
      </div>
      <div className="s3">
        {"I sing and play guitar in my free time. I'm currently playing:"}
      </div>
    </div>
  );
}

function Music(props) {
  return (
    <iframe className={props.section} src={props.url} 
    width={"250"} height={"80"} frameborder={"0"}></iframe> 
  );
}

function BackButton(props) {
  return (
    <button id="button" type="button" 
    onClick={(e) => {
      e.preventDefault();
      window.location.href=props.loc;
      }}>{props.text}</button>
  );
}

function AboutContainer(props) {
  return (
    <div className="aboutwhole">
    <div className="aboutsection">
      <div className="dp-container">
        <ProfilePicture/>
        <Header section='dpheader' text='Thanks for visiting!'/>
      </div>
      <div className='abouttext'>
        <MainHeader section='maintext'/>
      </div>
      <div className='music'>
        <Music section='afterglow' url='https://embed.spotify.com/?uri=spotify:track:0E4Y1XIbs8GrAT1YqVy6dq'/>
      </div>
    </div>
    <div id="backbutton">
        <BackButton text='Go Back' loc='../index.html'/>
    </div>
    </div>
  );
}

let domContainer = document.querySelector('#aboutpage');
ReactDOM.render(<AboutContainer />, domContainer);