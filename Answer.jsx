import { useEffect, useState } from "react";
import { checkHeading } from "./Helper";

// Remove heading markers like *** or ***&
function replaceHeadingStarts(str) {
  return str.replace(/^\*\*\*&?/, "").trim();
}

// Convert **bold** into <b> elements
function parseBoldText(str) {
  return str.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <b key={i}>{part.slice(2, -2)}</b>; // remove ** and wrap in <b>
    }
    return part;
  });
}

const Answer = ({ ans, index }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStarts(ans));
    } else {
      setAnswer(ans);
    }
  }, [ans]);

  return (
    <div>
      {index === 0 ? (
        <span>{parseBoldText(answer)}</span>
      ) : heading ? (
        <span style={{ color: "blue", fontWeight: "bold" }}>
          {parseBoldText(answer)}
        </span>
      ) : (
        <span>{parseBoldText(answer)}</span>
      )}
    </div>
  );
};

export default Answer;
