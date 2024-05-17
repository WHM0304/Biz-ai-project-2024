"use client";
import { text_generation } from "@/api/text_gen";
import css from "@/css/input.module.css";
import { useCallback, useState } from "react";
import ViewResultPage from "./ViewResult";

const InputPage = () => {
  const [wait, setWait] = useState(false);
  const [resultText, setResultText] = useState("");
  const [prompt, setPrompt] = useState({
    diagram: "none",
    project: "",
    discription: "",
  });
  const onCreateHandler = useCallback(async () => {
    const sendPrompt = `${prompt.project}를 구현하는데 필요한
        ${prompt.diagram}을 mermaid 스크립트 코드로 작성해 주세요
        그리고 다음의 내용을 포함하면 좋겠어요 ${prompt.discription}
    `;
    const result = await text_generation(sendPrompt);
    setResultText(result);
  });

  return (
    <>
      <form className={css.form}>
        <select
          name="diagram"
          className={css.diagram}
          value={prompt.diagram}
          onChange={(e) => setPrompt({ ...prompt, diagram: e.target.value })}
        >
          <option value="none" disabled selected>
            생성할 Diagram 을 선택하세요
          </option>
          <option value="class">class Diagram</option>
          <option value="erd">Entity Relation Diagram</option>
          <option value="sequence">Sequence Diagram</option>
        </select>
        <input
          placeholder="프로젝트 이름"
          name="project"
          value={prompt.project}
          onChange={(e) => setPrompt({ ...prompt, project: e.target.value })}
        />
        <textarea
          placeholder="자세한설명"
          rows="10"
          value={prompt.discription}
          onChange={(e) => setPrompt({ ...prompt, discription: e.target.value })}
        ></textarea>
        <button type="button" onClick={onCreateHandler}>
          생성하기
        </button>
      </form>
      {resultText && <ViewResultPage resultText={resultText} />}
    </>
  );
};

export default InputPage;
