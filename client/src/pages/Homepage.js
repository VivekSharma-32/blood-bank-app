import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/Modal/Modal";
import API from "../services/API";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  // get blood records
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getBloodRecords();
  }, []);
  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container">
            <h4
              className="ms-4"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-plus text-success py-4"></i> Add
              Inventory
            </h4>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Email</th>
                  <th scope="col">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 ? (
                  data?.map((record) => (
                    <tr key={record?._id}>
                      <td>{record?.bloodGroup}</td>
                      <td>{record?.inventoryType}</td>
                      <td>{record?.quantity} ML</td>
                      <td>{record?.email}</td>
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

            <Modal />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Homepage;
