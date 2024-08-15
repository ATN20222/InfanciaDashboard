import React, { useState } from 'react';

const AddFAQModal = ({ isOpen, onClose, onAddFAQ }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionError, setQuestionError] = useState('');
  const [answerError, setAnswerError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestionError("")
    setAnswerError("")

    if(question==''){
        setQuestionError("question is required")
        return
    }
    if(answer==''){
        setAnswerError("answer is required")
        return;

    }
    if(answer.length<50 || answer.length>1000){
        setAnswerError('answer must be between 50 - 1000 characters');
        return;
    }
    onAddFAQ(question ,answer );
    ClearData();
    
    onClose();
  };

  if (!isOpen) return null;

  const ClearData = ()=>{
    setAnswer('');
    setQuestion('')
    setAnswerError('');
    setQuestionError('');
  }

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="mymodal">
        <div className="modal-content">
          <h3>Add FAQ</h3>
          <div className="FormHr"></div>
          <form className="add-class-form" onSubmit={handleSubmit}>
            <label>
              <input 
                type="text" 
                name="question" 
                className='ClassNameInput mt-2' 
                placeholder='Question ' 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)} 
              />
              {questionError && (
                <span className='text-danger PopUpValidation'>{questionError}</span>
              )}
            </label>

            <label className='AnswerLabel'>
              <textarea 
                name="answer" 
                className={`ClassNameInput AnswerFAQ mt-2 ${!answerError?'mb-4':'mb-0'}`} 
                placeholder='Answer ' 
                value={answer} 
                onChange={(e) => setAnswer(e.target.value)} 
              />
              {answerError && (
                <span className='text-danger PopUpValidation mt-0 mb-4'>{answerError}</span>
              )}
            </label>
           
            <div className="form-buttons">
              <button type="submit" className="RegisterBtn">
                Save
              </button>
              <button type="button" className="CancelBtn" onClick={()=>{onClose();ClearData();}}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFAQModal;
