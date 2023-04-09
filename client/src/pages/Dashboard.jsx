import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTareas, reset } from "../features/tareas/tareaSlice";
import TareaForm from "../components/TareaForm";
import TareaList from "../components/TareaList";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { tareas, isError, isLoading, message } = useSelector(
    (state) => state.tareas
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getTareas());

    return () => {
      dispatch(reset());
    };
  }, [user, isError, navigate, dispatch, message]);

  return (
    <div className="dashboard">
      <h1> Tareas de {user && user.name} </h1>
      <TareaForm />
      {tareas.length > 0 ? (
        <div className="list">
          {tareas.map((tarea) => {
            return <TareaList key={tarea._id} tarea={tarea} />;
          })}
        </div>
      ) : (
        <div className="no-note">
          <h2>No hay tareas aun</h2>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
