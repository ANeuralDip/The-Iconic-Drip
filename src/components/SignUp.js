import React from 'react';


function SignUp(){
      return (
  
        <form>
          <div className="formContainer">
            <h2>SignUp Form</h2>
            <hr />
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter your email" name="email" required />
            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter your password" name="password" required />
            <label htmlFor="renterPassword"><b>Renter your password</b></label>
            <input type="password" placeholder="Renter Password" name="repeatPassword" required />
            <label>
              <input type="checkbox" defaultChecked="checked" name="remember" style={{marginbottom: '16px'}} /> Remember me
            </label>
            <p>By creating an account you agree to our <a href="#" style={{color: 'dodgerblue'}}>Terms &amp; Privacy</a></p><p> 
            </p><div>
              <button type="button" className="cancel">Cancel</button>
              <button type="submit" className="signup">SignUp</button>
              <a href="login.html"><button type="button" className="alreadyhaveanaccount">Already have an account "LOGIN" 
                </button></a>
            </div>
          </div></form>
      );
    }

export default SignUp;
