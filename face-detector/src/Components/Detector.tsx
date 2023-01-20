import * as React from 'react'
import Home from "./Home"

const Detector = () => {
    const [authenticated,setAuthenticated] = React.useState(false)
    
    let faceio;
    React.useEffect(() => {
        faceio = new faceIO("fioae4d3");
    }, []);


    const handleSignIn = async () => {
        try {
          let response = await faceio.enroll({
            locale: "auto",
          });
    
          console.log(` Unique Facial ID: ${response.facialId}
          Enrollment Date: ${response.timestamp}
          Gender: ${response.details.gender}
          Age Approximation: ${response.details.age}`);
        } catch (error) {
          console.log(error);
        }
      };

      const handleLogIn = async () => {
        try {
          let response = await faceio.authenticate({
            locale: "auto",
          }).then(data=>{
            console.log(data)
            if(data.facialId != ""){
                setAuthenticated(true)
            }
          })

            
        } catch (error) {
          console.log(error);
        }
      }
  return (
    authenticated ?
    <Home />
    :
    <section>
        <h1>Face Authentication by FaceIO</h1>
        <button onClick={handleSignIn}>Sign-in</button>
        <button onClick={handleLogIn}>Log-in</button>
    </section>
  )
}

export default Detector