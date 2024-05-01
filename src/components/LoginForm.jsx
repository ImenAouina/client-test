import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginForm = (props) => {
    const {authorized,setAuthorized} = props

    const navigate = useNavigate();
    const [userInfo , setUserInfo] = useState({
        email : "",
        password : ""
    })


    const [errors, setErrors] = useState([]);
    const [loginerrors, setLoginerrors] = useState([]);

    const [userInfoRegistre , setUserInfoRegistre] = useState({
        userName : "",
        email : "",
        password : "",
        confirmPassword : ""
    })

    const changeHandlerRegiste = (e) =>{
        setUserInfoRegistre({
            ...userInfoRegistre,
          [e.target.name] : e.target.value
        }) 
    }

    const changeHandler = (e) =>{
        setUserInfo({
            ...userInfo,
          [e.target.name] : e.target.value
        }) 
    }
        const submitHandlerRegister = (e) => {
            e.preventDefault()
            setAuthorized('')
            axios.post("http://localhost:5000/api/register", userInfoRegistre , {withCredentials : true})
                .then(res => {
                    console.log("Successfully submitted ✅✅✅")
                     console.log(res)
                     navigate('/')
                     
                })
                .catch(err => {
                    console.log(err.response.data.errors)
                    const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                    const errorArr = []; // Define a temp error array to push the messages in
                    for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                        errorArr.push(errorResponse[key].message)
                    }
                    // Set Errors
                    setErrors(errorArr);
                })
            }


        const submitHandler = (e) => {
            e.preventDefault()
          setAuthorized('')
            axios.post("http://localhost:5000/api/login", userInfo , {withCredentials : true})
                .then(res => {
                    console.log("Successfully submitted ✅✅✅")
                     console.log(res)
                     navigate('/')
                     
                })
                .catch(err => {
                    console.log(err.response.data.error)
                    .catch(err => {
                        console.log(err.response.data.error)
                        const errorResponse1 = err.response.data.error; // Get the errors from err.response.data
                        const errorArr1 = []; // Define a temp error array to push the messages in
                        for (const key of Object.keys(errorResponse1)) { // Loop through all errors and get the messages
                            errorArr1.push(errorResponse1[key].message)
                        }
                        // Set Errors
                        setLoginerrors(errorArr1);
                    })
                })
            }
        

  return (
    <div >
          <h1 className='text-danger' style={{textAlign : 'center'}}>{authorized}</h1>
          <div className='d-flex'>
             <div className='col-4 p-5 offset-1' style={{border : '1px solid'}}>
             
               
                
        
         {/********Register Form***** */}
         
        <form  className="col-md-8 mx-auto" onSubmit={submitHandlerRegister}>
            <h3 className='text-center' style={{border:"1px solid black", backgroundColor:"#dddddd"}}>Register</h3>
            {errors.map((err, index) => <p style={{ color: "red" }} key={index}>{err}</p>)}
            <div className='form-group'>
                    <label className='form-label' >Username* :</label>
                    <input type='text' className='form-control' name='userName' value={userInfoRegistre.userName} onChange={changeHandlerRegiste}/>
                        { errors.userName ? 
                                <p>{errors.userName.message}</p>
                                : null
                        }  
            </div>
            <div className='form-group'>
                    <label className='form-label'  >Email* :</label>
                    <input type='email' className='form-control' name='email' value={userInfoRegistre.email} onChange={changeHandlerRegiste}/>
                        { errors.email ? 
                                <p>{errors.email.message}</p>
                                : null
                        }  
            </div>
            <div className='form-group'>
                    <label className='form-label' >Password* :</label>
                    <input type='password' className='form-control' name='password' value={userInfoRegistre.password} onChange={changeHandlerRegiste}/>
            </div>
            <div className='form-group'>
                    <label className='form-label'  >Confirm Password* :</label>
                    <input type='password' className='form-control' name='confirmPassword' value={userInfoRegistre.confirmPassword} onChange={changeHandlerRegiste}/>
            </div>
            <div className='form-group'>
               <button type='submit' className='btn btn-primary mt-3'>Register</button>   
            </div>
        </form>

    </div>

    {/********login Form***** */}

         <div className='col-4 p-5 offset-1' style={{border : '1px solid'}}>
        
        <form  className="col-md-8 mx-auto" onSubmit={submitHandler}>
            <h3 className='text-center'style={{border:"1px solid black", backgroundColor:"#dddddd"}}>Login</h3>
            {loginerrors.map((err, index) => <p style={{ color: "red" }} key={index}>{err}</p>)}
            <div className='form-group'>
                    <label className='form-label'  >Email :</label>
                    <input type='email' className='form-control' name='email' value={userInfo.email} onChange={changeHandler}/>
                        
            </div>
            <div className='form-group'>
                    <label className='form-label' >Password :</label>
                    <input type='password' className='form-control' name='password' value={userInfo.password} onChange={changeHandler}/>
            </div>
            <div className='form-group'>
               <button type='submit' className='btn btn-primary mt-3'>Login</button>   
            </div>
        </form>
    </div>
          </div>
           
    </div>
   
  )
}

export default LoginForm