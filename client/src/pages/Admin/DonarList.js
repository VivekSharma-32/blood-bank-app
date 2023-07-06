import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const DonarList = () => {
  const [data, setData] = useState([]);

  // find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      if (data?.success) {
        setData(data?.donarData);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDonars();
  }, []);

  // delete function
  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this donar",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {}
  };
  return (
    <Layout>
      <div className="container mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((record) => (
                <tr key={record?._id}>
                  <td>{record?.name || record?.organisationName + "(ORG)"}</td>
                  <td>{record?.email}</td>
                  <td>{record?.phone} </td>
                  <td>
                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(record?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center p-3" colSpan={5}>
                  No record Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DonarList;
