import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteTarea, updateTarea } from "../features/tareas/tareaSlice";

import { RiDeleteBinLine } from "react-icons/ri";

const TareaList = ({ tarea }) => {
  const [itemStatus, setItemStatus] = useState(tarea.textStatus);

  const { isError, message } = useSelector((state) => state.tareas);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
  }, [tarea, dispatch, message]);

  // check
  const changeStatus = () => {
    const updatedTarea = {
      ...tarea,
      textStatus: !itemStatus,
    };
    dispatch(updateTarea(updatedTarea));
    setItemStatus(!itemStatus);
  };

  return (
    <ul>
      <li onDoubleClick={changeStatus}>
        <input
          type="checkbox"
          name="item"
          checked={itemStatus}
          onChange={changeStatus}
        />
        <div className="title">{tarea.text}</div>
        <i onClick={() => dispatch(deleteTarea(tarea._id))}>
          <RiDeleteBinLine />
        </i>
      </li>
    </ul>
  );
};

export default TareaList;
