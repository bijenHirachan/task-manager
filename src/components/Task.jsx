import React from "react";
import { Link } from "react-router-dom";

const Task = ({ task }) => {
  return (
    <Link
      to={`/tasks/${task.id}/edit`}
      className="px-2 py-2 relative rounded text-one font-semibold bg-four"
    >
      <h3>{task.title}</h3>
      <span
        className={`uppercase absolute right-2 text-xs px-1 font-semibold rounded ${
          task.status === "open"
            ? "bg-green-500  text-green-50"
            : "bg-red-500  text-red-50"
        }`}
      >
        {task.status}
      </span>
    </Link>
  );
};

export default Task;
