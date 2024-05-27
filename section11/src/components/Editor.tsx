import { ReactElement, useState } from "react";

interface Props {
  onClickAdd: (text: string) => void;
  children: ReactElement;
}

function Editor({ onClickAdd }: Props) {
  // const Editor: React.FC<Props> = ({ onClickAdd }) => {
  const [text, setText] = useState("");
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const onClickButton = () => {
    onClickAdd(text);
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
