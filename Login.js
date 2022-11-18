import React, { useState,useReducer,useContext} from 'react';
import AuthContext from '../../STORE/auth-context';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const emailReducer=(state,action)=>{
  if(action.type==='USER_INPUT')
  {
    return{value:action.val ,isValid:action.val.includes('@')};
  }
  if(action.type==='INPUT_BLUR')
  {
    return{value: state.value ,isValid:state.value.includes('@')};
  }
   return {value:'',isValid:false}
};

const pwordReducer=(state,action)=>{
 if(action.type==='USER_INPUT')
 {
  return {value:action.val,isValid:action.val.trim().length>8};
 }
 if(action.type==='INPUT_BLUR')
 {
  return{value:state.value,isValid:state.value.trim().length>8}
 }
 return {value:'',isValid:false}
}

const Login = (props) => {

 const authCtx= useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
 const [emailState,dispatchEmail]=useReducer(emailReducer,
    {value:'',
    isValid:false
  });
 const [pwordState,dispatchpword]=useReducer(pwordReducer,{
    value:'',
    isValid:false
  })

//  useEffect(()=>{
//   console.log("ON")
//   const identifer =setTimeout(()=>{
//     console.log("UPDATING");
//     setFormIsValid(
//       enteredEmail.includes('@') && enteredPassword.trim().length>6&&enteredCollege
//     )
//   },500)
  
//    return(()=>{
//     clearTimeout(identifer);
//    })
//  },[enteredEmail,enteredPassword,enteredCollege])

const emailChangeHandler = (event) => {
    dispatchEmail({
     type:'USER_INPUT',
     val:event.target.value
    });
    setFormIsValid(
      pwordState.value.trim().length>8 && event.target.value.includes('@')
    )
  };

const passwordChangeHandler = (event) => {
    dispatchpword(
      {
        type:'USER_INPUT',
        val:event.target.value
      }
    ) 
    setFormIsValid(
      event.target.value.trim().length>8 && emailState.value.includes('@')
    )
    
   }

 
  const validateEmailHandler = () => {
   dispatchEmail(
    {
     type:'INPUT_BLUR',
    }
   );
   setFormIsValid(
     emailState.isValid
   )
  };

  const validatePasswordHandler = () => {
    dispatchpword(
      {
        type:'INPUT_BLUR',
      }
    )
    setFormIsValid(
      pwordState.isValid
    )
  };
  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, pwordState.value);
   
  };

  
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id="email" label=
        "E-MAIL" type="email" isValid={emailState.isValid} value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        />
        <Input id="password" label=
        "PASSWORD" type="password" isValid={pwordState.isValid} value={pwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        />
       
        {/* <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
