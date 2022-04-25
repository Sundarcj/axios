import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import { useState } from 'react';
import { useEffect,useCallback } from 'react';


function App() {
  const [question, setQuestion] = useState([]);
  const [answerClick, setAnswerClick] = useState([]);
  const [currentQsn, setCurrentQsn] = useState(0);

  let token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJQcmFiaHUgRGV2YSIsIlVzZXJJZCI6IjEiLCJleHAiOjE2NTA2MDk5ODgsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyOTkvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI5OS8ifQ.8F_qsDRRM5sjuFQQqZNVdjhGSBWyNdAaboS67aAuxg9E128GxkdoC-6EaJwk8xh37pMeycPxt-ZKBEEzWge7hA'

  // var qsnData = [];
  let url = "https://ofsquizapi.azurewebsites.net/api/Questions/GetQuestions";
    const fetchData = useCallback(async () => {
    try {
      let response = await fetch(url,{
        headers:{
        "Authentication" : "Bearer" + token

        }
      });
      let json = await response.json();
      // qsnData = json.data;
      setQuestion(json.data);
      console.log(json.data);
      
    } catch (error) {
      throw error;
    } 
  }, [url]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log(question,"qsns");
  // useEffect(() => {
  //   axios
  //     .get("https://ofsquizapi.azurewebsites.net/api/Questions/GetQuestions")
  //     .then((res) => {
  //       qsnData = res.data.data;
  //       setQuestion(qsnData);
     
  //       // console.log(res.data.data);
  //       console.log(qsnData,"qsnData");
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // }, [question]);

 
  const handleClickNext = ()=>{

  }
  const handleClickPrev = () =>{

  }
  // const handleShuffle = () => {
  //     let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //     let shuffledArr = [];
  //     while (arr.length > 0) {
  //         let randomIndex = Math.floor(Math.random() * arr.length);
  //         shuffledArr.push(arr[randomIndex]);
  //         arr.splice(randomIndex, 1);
  //     }
  //     console.log(shuffledArr);
  // }
  // console.log(question, "question");
  return (
    <div>
      {/* <h1>{question.data}</h1> */}
      {question.data && (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQsn + 1}</span>/{question.data.length}
            </div>
            <div className="question-text">
              {question.data[currentQsn].questionText}
            </div>
          </div>
          <div className="answer-section">
            {question.data.map((qsn, index) => {
              return (
                <div key={index}>
                  <h1>{qsn.questionText}</h1>
                  <div>
                    {qsn.answerOptions.map((answerOption, questionId) => {
                      return (
                        <div key={questionId}>
                          <input
                            type="radio"
                            name={qsn.questionText}
                            value={answerOption.answerOptions}
                            onClick={(e) => {
                              setAnswerClick(answerOption.answerOptions);
                            }}
                          />
                          <span>{answerOption.answerText}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );


};



export default App;
