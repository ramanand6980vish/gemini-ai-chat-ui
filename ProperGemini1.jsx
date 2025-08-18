import { useState } from 'react'
import './ProperGemini.css'
import { url } from './constants';
import Answer from './Answer';

export default function Gemini() {
    const [quest, setQuest] = useState("");
    const [qas, setQas] = useState([]);  //for ques n ans

    const askQuest = async () => {
        const payload = {
            contents: [
                {
                    parts: [{ text: quest }]
                }
            ]
        };

        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        response = await response.json();
        let dataString = response.candidates[0].content.parts[0].text;

        // split by * 
        let answers = dataString.split("* ").map((item) => item.trim());

        // push into Q&A state
        setQas(prev => [...prev, { question: quest, answers }]);

        setQuest(""); // clear input
    };

    return (
        <div className='main'>
            <div className="hisNnav">
                History and Navbar
            </div>

            <div className="chat">
                <div className='ans'>
                    {
                        qas.length === 0
                            ? <p>How can Gemini help you today...</p>
                            : qas.map((qa, index) => (
                                <div key={index} className="qa-block">
                                    <div  className="question"><div ><b className='ques'>Q: {qa.question}</b></div></div>
                                    <ul>
                                        {qa.answers.map((item, i) => (
                                            <li key={i}>
                                                <Answer ans={item} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                    }
                </div>

                <div className='ask'>
                    <input
                        value={quest}
                        onChange={(event) => setQuest(event.target.value)}
                        type="text"
                        placeholder='Ask anything...'
                        required
                        onKeyDown={(e) => e.key === 'Enter' && askQuest()}
                    />
                    <div onClick={() => quest && askQuest()} className='askbtn'>ASK</div>
                </div>
            </div>
        </div>
    );
}

