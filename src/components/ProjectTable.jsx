import React from "react";
import { Link } from "react-router-dom";

const ProjectTable = ({ projects }) => {
  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-one uppercase bg-four">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
          </tr>
        </thead>
        <tbody>
          {projects?.length > 0 ? (
            projects.map((project) => (
              <tr
                key={project.id}
                className="bg-white border-b  hover:bg-gray-50 text-one"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  <Link to={`/projects/${project.id}`}>{project.title}</Link>
                </th>
              </tr>
            ))
          ) : (
            <tr className="bg-white border-b  hover:bg-gray-50 text-one">
              <th
                scope="row"
                className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap "
              >
                No projects found
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
