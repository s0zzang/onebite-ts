import { Todo } from "../types";

interface Props extends Todo {
  onClickDelete: (id: number) => void;
}

const TodoItem = ({ onClickDelete, id, content }: Props) => {
  const onClickButton = () => {
    onClickDelete(id);
  };

  return (
    <div>
      {id}번은 {content}
      <button onClick={onClickButton}>삭제</button>
    </div>
  );
};

export default TodoItem;
