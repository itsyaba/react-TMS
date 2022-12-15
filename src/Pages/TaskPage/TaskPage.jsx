import NavBar from "../../components/NavBar/NavBar";
import Tasks from "../../components/TaskLists/Tasks";
// import Drawer from "../../components/NavBar/Drawer/Drawer";

function TaskPage() {
  return (
    <>
      <div className="ml-12">
        <NavBar />
        <Tasks />
      </div>
    </>
  );
}

export default TaskPage;
