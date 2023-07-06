import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success bg-light">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank App</h3>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure at
            doloribus corrupti esse voluptatem modi veritatis quos magni hic
            reiciendis? Voluptas quasi facere temporibus, eaque veniam
            exercitationem neque repellendus labore accusamus dolor odio,
            nostrum vitae, minus ex aspernatur voluptatem et ut provident modi
            esse eius sunt! Saepe explicabo doloribus eaque inventore enim
            deleniti cum illum fuga quis! Adipisci autem sequi unde. Aspernatur
            labore quos dolore in? Eos cumque magni fugiat minima esse itaque
            necessitatibus facere. Necessitatibus dolorum officiis ab itaque
            delectus vitae perferendis laudantium expedita voluptatem harum
            dolore culpa, neque assumenda ducimus distinctio excepturi quia
            ipsum nesciunt minus temporibus qui quis nam iste ullam? Maxime quis
            esse possimus cum consectetur beatae. Ex, assumenda quaerat nesciunt
            aut debitis ab sint est quasi autem amet iste officia, quis neque
            repellendus sit earum quod expedita nobis sapiente magni mollitia
            adipisci, possimus porro explicabo? Rerum itaque blanditiis numquam
            quibusdam, non nam dignissimos sunt, ipsam suscipit ullam iste ea.
            Earum aliquam numquam asperiores odio obcaecati, eum nesciunt
            tempora laborum aperiam! Voluptates deleniti laudantium mollitia,
            perferendis odit fugit labore cum doloremque quia eligendi aliquid
            eos suscipit commodi esse obcaecati voluptatem error. Vitae, in.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
