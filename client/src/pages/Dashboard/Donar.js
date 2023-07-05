import React, { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "./../../services/API";
import moment from "moment";

const Donar = () => {
  const [data, setData] = useState([]);

  // find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/inventory/get-donars");
      if (data?.success) {
        setData(data?.donars);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDonars();
  }, []);
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

export default Donar;
