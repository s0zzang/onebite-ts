import { ReactElement, useState } from "react";
import { TodoDispatchContext, useTodoDIspatch } from "../App";

interface Props {
  children: ReactElement;
}

function Editor(prop: Props) {
  const dispatch = useTodoDIspatch();
  const [text, setText] = useState("");
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const onClickButton = () => {
    dispatch.onClickAdd(text);
    setText("");
  };

  return (
    <>
      <input type="text" value={text} onChange={onChangeInput} />
      <button onClick={onClickButton}>추가</button>
    </>
  );
}

export default Editor;
