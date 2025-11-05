import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBids(data);
        });
    }
  }, [user?.email]);
  return (
    <div>
      <h1>MyBids: {bids.length}</h1>
    </div>
  );
};

export default MyBids;
