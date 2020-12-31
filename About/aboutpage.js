function ProfilePicture(props) {
  return React.createElement("img", { className: "dp", src: "./assets/dp.jpg" });
}

function Header(props) {
  return React.createElement(
    "div",
    { className: props.section },
    props.text
  );
}

function MainHeader(props) {
  return React.createElement(
    "div",
    { className: props.section },
    React.createElement(
      "div",
      { className: "s1" },
      "My name is George and I study Computer Science at the ",
      React.createElement(
        "span",
        { id: "uwaterloo" },
        'University of Waterloo'
      ),
      " ",
      '.'
    ),
    React.createElement(
      "div",
      { className: "s2" },
      "In addition to my personal projects, I've completed internships as a Full-Stack Web Developer in Fintech and as a QA Engineer at the 2nd fastest growing software company."
    ),
    React.createElement(
      "div",
      { className: "s3" },
      "I sing and play guitar in my free time. I'm currently playing:"
    )
  );
}

function Music(props) {
  return React.createElement("iframe", { className: props.section, src: props.url,
    width: "250", height: "80", frameborder: "0" });
}

function BackButton(props) {
  return React.createElement(
    "button",
    { id: "button", type: "button",
      onClick: function onClick(e) {
        e.preventDefault();
        window.location.href = props.loc;
      } },
    props.text
  );
}

function AboutContainer(props) {
  return React.createElement(
    "div",
    { className: "aboutwhole" },
    React.createElement(
      "div",
      { className: "aboutsection" },
      React.createElement(
        "div",
        { className: "dp-container" },
        React.createElement(ProfilePicture, null),
        React.createElement(Header, { section: "dpheader", text: "Thanks for visiting!" })
      ),
      React.createElement(
        "div",
        { className: "abouttext" },
        React.createElement(MainHeader, { section: "maintext" })
      ),
      React.createElement(
        "div",
        { className: "music" },
        React.createElement(Music, { section: "afterglow", url: "https://embed.spotify.com/?uri=spotify:track:0E4Y1XIbs8GrAT1YqVy6dq" })
      )
    ),
    React.createElement(
      "div",
      { id: "backbutton" },
      React.createElement(BackButton, { text: "Go Back", loc: "../index.html" })
    )
  );
}

var domContainer = document.querySelector('#aboutpage');
ReactDOM.render(React.createElement(AboutContainer, null), domContainer);