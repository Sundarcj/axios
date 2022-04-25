import { useEffect,useState } from "react";
import axios from 'axios';
function App(){
 
 const [userData,setUserData] = useState([]);
  useEffect(() => {
    axios.get("https://ofsquizapi.azurewebsites.net/api/users/GetCompletedCandidateDetails",{
      headers: {
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJQcmFiaHUgRGV2YSIsIlVzZXJJZCI6IjEiLCJleHAiOjE2NTA2MDk3NTgsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyOTkvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI5OS8ifQ.CxNzI5KzHKksP79nAU2dwvlLcthASqwqD5bAUgLYqH-BMONYsPZqhWTuJh24UO_3spso4c-2r6f6-4WwZ5hjmg "
      },

    }).then((res)=>{
      console.log(res.data.data,"details");
      setUserData(res.data.data);
  
    }).catch((err) => {
      alert(err);
    });
  },[]);
  const renderTable = () =>{
    return userData.map(user =>{
      return(
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      )
    })
  }
  return(

    <div id = "title">
      {/* <table id="users">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {renderTable()}
        </tbody>
        
      </table> */}
    </div>
    
  )

 
}
export default App;