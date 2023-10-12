import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
function Home()
{
    return(
        <> 
            <Navbar/>
            <Hero
            cName="hero"
            //heroImg="https://plus.unsplash.com/premium_photo-1681843077712-b9b1ae83e0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2984&q=80"
            title="Your Heart Your Happiness"
            text="Health is important .....so keep running!"
            btnText="S  .    O   .   S"
            url="/"
            btnClass="show"
            btnClass2="show"
            btnText2="Simulate heart attack"
            />
            
        </>
    );
}
export default Home;