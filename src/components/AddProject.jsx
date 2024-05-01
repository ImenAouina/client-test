import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';


const AddProject = (props) => {
    const {projects, setProjects} = props
    const [title, setTitle] = useState("");
    const [dueDate, setdueDate] = useState("")
    const [errors, setErrors] = useState([]); 
     
    const nav = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        const obj = {
            title,
            dueDate,
        }
        axios.post("http://localhost:5000/api/projects", obj)
            .then(res => {
            console.log("Project is successfully created", res.data)
            setProjects([...projects, res.data]);
            setTitle("");
            setdueDate("");
            nav("/")
            })
            .catch(err=>{
                setErrors(err.response.data.errors);
            }) 
    }
    return (
        <div style= {{ display:"flex", alignItems:"center", flexDirection:'column' }}>
            <div style={{paddingLeft:"350px",display:"flex", justifyContent:"flex-end"}}>
                <Link to="/">Back to Dashboard</Link>
            </div>
            <div>
            <fieldset 
                style={
                    {width:"500px",
                    border: "2px groove black",
                    padding: "20px",
                    marginTop:"30px"}}>
                    <legend>Plan a new Project</legend>
                    
                    <Form onSubmit={submitHandler} >
                        {/* {
                        Object.keys(errors).map((key) => (
                            <p key="{key}" style={{color:"red"}}>{errors[key].message}</p>
                        ))
                        } */}
                        <Form.Group className="mb-3">
                            <Form.Label>Project:</Form.Label>
                            <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)}  />
                                { errors.title ? 
                                    <p style={{color:"red", fontWeight:"bold"}}>{errors.title.message}</p>
                                    : null
                                } 
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Due Date:</Form.Label>
                            <Form.Control type="date" value={dueDate} onChange={e => setdueDate(e.target.value)}  />
                                { errors.dueDate ? 
                                    <p style={{color:"red", fontWeight:"bold"}}>{errors.dueDate.message}</p>
                                    : null
                                } 
                        </Form.Group>
                        <Button className="btn btn-primary" variant="success" type="submit" style={{width:"100%", backgroundColor:"#9fc5f8", color:"black"}} >Plan Project</Button>

                        {/* <Button className="btn btn-primary" type="submit" onClick={() => { nav(`/players/list`) }} > Add </Button>  */}
                        {/* { errors.name ? 
                                <Button className="btn btn-primary" variant="success" disabled  type="submit" style={{width:"100px"}}>Add</Button>
                                : <Button className="btn btn-primary" variant="success" type="submit" style={{width:"100px"}} >Add</Button>
                                }  */}
                        
                    </Form>
                </fieldset>
            </div>
        </div>    
        
    )
}

export default AddProject;  
