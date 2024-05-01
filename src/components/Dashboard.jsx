import dateFormat from 'dateformat'
import React, { useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const Dashboard = (props) => {

    const {projects, setProjects} = props;
    
    function refrech() {
        axios.get("http://localhost:5000/api/projects")
            .then(res => {
                console.log(res.data)
               
                let orderedProjects = (res.data.projects).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                console.log(orderedProjects)
                setProjects(orderedProjects)
            })
            .catch(err => {
                console.log(err)
            })

    }
    useEffect(() => {
        refrech()
    }, [])

    const DeleteThisProject = (deleteId) => {
        axios.delete("http://localhost:5000/api/projects/" + deleteId)
            .then(res => {
                refrech()
                console.log(res.data)
                const filteredProjects = projects.filter((eachProject) => {
                    return eachProject._id !== deleteId
                })
                setProjects(filteredProjects)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const changeStatus=(id,status) => {
      
      let newObj = projects.filter(item => item._id === id)[0]
      console.log(newObj) 
      let updatedObj = {...newObj, projectStatus : status}
       console.log(updatedObj)
        axios.patch(`http://localhost:5000/api/projects/${id}`, updatedObj)
            .then(res => {
                console.log("✅✅✅✅", res.data)
                refrech()
                
            })
            .catch(err => console.log("❌❌❌❌❌", err))
    }
    
    return (
        <div>
            
            <div style={{
                        margin:"30px",
                        padding: "20px",
                        }}>
                    <Table striped bordered variant="light" style={{border:"2px solid black", padding:"10px" }}>
                    <thead>
                        <tr>
                            <th style={{backgroundColor:"#9fc5f8", textAlign:"center", fontSize:"1.5em"}}>Backlog</th>
                            <th style={{backgroundColor:"#ffe599", textAlign:"center", fontSize:"1.5em"}}>In Progress</th>
                            <th style={{backgroundColor:"#b6d7a8", textAlign:"center", fontSize:"1.5em"}}>Completed </th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr key="tablekey">
                        <td>
                          {
                              projects.map((item, index) => 
                              (item.projectStatus === "backlog") && 
                                <div style= {{border:"2px solid black", padding:"30px", margin:"20px", borderRadius:"15px"}} >
                                    <h3>{item.title}</h3>
                                    <p>Due :  <span style={{color:new Date() > new Date(item.dueDate) && "red" || "black", marginleft:"20px" }} >{dateFormat(item.dueDate, 'yyyy/mm/dd')}</span></p>
                                    <Button style={{backgroundColor:"#ffe599", color:"black", width:"100%", border:"20px"}} onClick={()=>{changeStatus(item._id, "In progress")}} >Start Project </Button> 
                                </div> )
                            }
                        </td>
                        <td>
                          {
                              projects.map((item, index) => 
                              (item.projectStatus === "In progress") && 
                                <div style= {{border:"2px solid black" , padding:"30px", margin:"20px", borderRadius:"15px"}}>
                                    <h3>{item.title}</h3>
                                    <p>Due :  <span style={{color:new Date() > new Date(item.dueDate) && "red" || "black", marginleft:"20px" }}>{dateFormat(item.dueDate, 'yyyy/mm/dd')}</span></p>
                                    <Button style={{backgroundColor:"#b6d7a8", color:"black", width:"100%", border:"20px"}} onClick={()=>{changeStatus(item._id, "completed")}} >Move to completed</Button>
                                  </div> )
                            }
                          </td>
                          <td>
                          {
                              projects.map((item, index) => 
                              (item.projectStatus === "completed") && 
                                <div style= {{border:"2px solid black", padding:"30px", margin:"20px", borderRadius:"15px"}}>
                                    <h3>{item.title}</h3>
                                    <p>Due :  <span style={{color:new Date() > new Date(item.dueDate) && "red" || "black", marginleft:"20px" }}>{dateFormat(item.dueDate, 'yyyy/mm/dd')}</span></p>
                                    <Button style={{backgroundColor:"#ea9999", color:"black", width:"100%", border:"20px"}}onClick={() => { DeleteThisProject(item._id) }}>Remove Project</Button>
                                  </div> )
                            }
                          </td>
                      </tr> 
                    </tbody>
                </Table>
                <Link to="/projects/new"><button style={{backgroundColor:"#9fc5f8",width:"300px", borderRadius:"20px "}}>Add new Project </button></Link>
                </div>
        </div>
    )
}

export default Dashboard
