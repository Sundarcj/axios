import { useEffect,useState } from "react";
import axios from 'axios';
function App(){

  const [question, setQuestion] = useState([]);
  const [answerClick, setAnswerClick] = useState([]);
  const [btnText,setBtnTxt] = useState("Next");
  const [score, setScore] = useState(0);
  const [currentQsn, setCurrentQsn] = useState(0);
  useEffect(() => {
    axios
      .get("https://ofsquizapi.azurewebsites.net/api/Questions/GetQuestions", {
        headers: {
          // "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDYW5kaWRhdGUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdCB1c2VyIiwiVXNlcklkIjoiMiIsImV4cCI6MTY1MDk0ODI3NCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI5OS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3Mjk5LyJ9.2ifflXxZeA1D6pQ4V-Pf0lf6JNqpXJ2BsXg6iMrVmE819nAdYkzcV9hZj0crnD5QlWOmZs-LR1onyc5oeDCrXw"
        },
      })
      .then((res) => {
         setQuestion(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    axios.get("https://ofsquizapi.azurewebsites.net/api/users/GetAllCandidates",{
      headers: {
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDYW5kaWRhdGUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdCB1c2VyIiwiVXNlcklkIjoiMiIsImV4cCI6MTY1MDk0ODI3NCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI5OS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3Mjk5LyJ9.2ifflXxZeA1D6pQ4V-Pf0lf6JNqpXJ2BsXg6iMrVmE819nAdYkzcV9hZj0crnD5QlWOmZs-LR1onyc5oeDCrXw "
      },

    }).then((res)=>{
      console.log(res,"details");
    })
  },[]);

  const handleClickPrev = () => {
    let prevQsn = currentQsn - 1;
    setCurrentQsn(prevQsn);
  };
  const handleSubmit = () =>{
    console.log(score,"score");
  }
  const handleClickNext = () => {
    let nextQsn = currentQsn + 1;
    setCurrentQsn(nextQsn);
    if (nextQsn === question.data.length - 1) {
      setBtnTxt("Submit");
    }
    if(btnText === "Submit"){
      handleSubmit();
    }
  };
  const handleAnswerOptionClick = (isCorrect) =>{
    // if (isCorrect) {
		// 	setScore(score + 1);
		// }
    

		// const nextQuestion = currentQsn + 1;
		// if (nextQuestion < question.data.length) {
		//   setCurrentQsn(nextQuestion);
		// } else {
		// 	// setShowScore(true);
		// }
  }
 return(
  <div>
      {/* <h1>{question.data}</h1> */}
      {question.data && (
        <>
          <div>
            <div className="question-count">
              <span>Question {currentQsn + 1}</span>/{question.data.length}
            </div>
            <div className="question-text">
              {question.data[currentQsn].questionText}
            </div>
            <div className="answer-section">
{question.data[currentQsn].answerOptions.map((answerOption, index) => (
  <>
   <input
   type="radio"
   name={question.questionText}
   value={answerOption.answerOptions}
   onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
 />
 {/* <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button> */}
            <span>{answerOption.answerText}</span>

            
</>
))}
            </div>


            <button onClick={handleClickPrev}>Prev</button>
            <button onClick={handleClickNext}>{btnText}</button>
          </div>
         
        </>
        )}
    </div>

 )
}
export default App;