import React from "react";
import { Link } from "react-router-dom";

const TaskTable = ({ tasks, inProject }) => {
  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-one uppercase bg-four">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            {!inProject && (
              <th scope="col" className="px-6 py-3">
                Project
              </th>
            )}
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr
                key={task.id}
                className="bg-white border-b  hover:bg-gray-50 text-one"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  <Link to={`/tasks/${task.id}/edit`}>{task.title}</Link>
                </th>
                {!inProject && (
                  <td className="px-6 py-4 font-semibold">
                    {task?.project ? (
                      <Link to={`/projects/${task.project.id}`}>
                        {task.project.title}
                      </Link>
                    ) : (
                      "N/A"
                    )}
                  </td>
                )}
                <td className="px-6 py-4">
                  <span
                    className={`uppercase text-xs px-2 py-1 font-semibold rounded ${
                      task.status === "open"
                        ? "bg-green-500  text-green-50"
                        : "bg-red-500  text-red-50"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border-b  hover:bg-gray-50 text-one">
              <th
                scope="row"
                colSpan={3}
                className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap "
              >
                No tasks found
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
