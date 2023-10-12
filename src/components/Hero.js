import "./HeroStyles.css"
import {Routes, Route, useNavigate} from 'react-router-dom';
function Hero(props){
    const navigate=useNavigate();
    return(<>
    <div className={props.cName}>
        {/*<img alt="happy faces" src={props.heroImg}/>*/}
        
    <div className="hero-text">
        <h1>{props.title}</h1>
        <p>{props.text}</p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        

<a
  href={props.url}
  className={props.btnClass}
  onClick={(e) => {
    e.preventDefault(); 
    setTimeout(() => {
      navigate('/location');
    }, 1000); 
  }}
>
  {props.btnText}
</a>
<br></br>
<a
  href={props.url}
  className={props.btnClass2}
  onClick={(e) => {
    e.preventDefault(); 
    setTimeout(() => {
      navigate('/about');
    }, 1000); 
  }}
>
  {props.btnText2}
</a>
    </div>
    </div>
    </>);
}
export default Hero;