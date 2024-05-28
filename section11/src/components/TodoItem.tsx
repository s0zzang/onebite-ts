import { useTodoDIspatch } from "../App";
import { Todo } from "../types";

interface Props extends Todo {}

const TodoItem = ({ id, content }: Props) => {
  const dispatch = useTodoDIspatch();
  const onClickButton = () => {
    dispatch.onClickDelete(id);
  };

  return (
    <div>
      {id}번은 {content}
      <button onClick={onClickButton}>삭제</button>
    </div>
  );
};

export default TodoItem;
