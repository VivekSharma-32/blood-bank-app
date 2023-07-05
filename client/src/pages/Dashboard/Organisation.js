import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { useSelector } from "react-redux";

const Organisation = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);

  // find organisation records
  const getOrganisation = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-organisation");
        if (data?.success) {
          setData(data?.organisations);
        }
      }
      if (user?.role === "hospital") {
        const { data } = await API.get(
          "/inventory/get-organisation-for-hospital"
        );
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getOrganisation();
  }, [user]);
  return (
    <Layout>
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
                <td>{record?.organisationName || "NA"}</td>
                <td>{record?.email}</td>
                <td>{record?.phone} </td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
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
    </Layout>
  );
};

export default Organisation;
