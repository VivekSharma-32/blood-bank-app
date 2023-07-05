import React, { useEffect, useState } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setdata] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#884A39",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];
  // GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setdata(data?.bloodGroupData);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Lifecycle method
  useEffect(() => {
    getBloodGroupData();
  }, []);

  // get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        console.log("Inventory data", data?.inventory);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <>
      <Header />
      <div className="container d-flex flex-row flex-wrap justify-content-center align-items-center my-3">
        {data?.map((record, i) => (
          <div
            className="card m-2 p-1"
            style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
            key={i}
          >
            <div className="card-body">
              <h1 className="card-title bg-light text-dark text-center mb-3">
                {record?.bloodGroup}
              </h1>
              <p className="card-text">
                Total In: <b>{record?.totalIn} ml</b>
              </p>
              <p className="card-text">
                Total Out: <b>{record?.totalOut} ml</b>
              </p>
            </div>
            <div className="card-footer text-light bg-dark text-center p-2">
              Total Available : <b>{record?.availableBlood}</b>
            </div>
          </div>
        ))}
      </div>
      <div className="container my-3">
        <h1 className="my-3">Recent Blood Transactions</h1>
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
            {inventoryData?.length > 0 ? (
              inventoryData?.map((record) => (
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
      </div>
    </>
  );
};

export default Analytics;
