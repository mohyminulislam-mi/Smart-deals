import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const ProductsDetails = () => {
  const { user } = use(AuthContext);
  const { _id: productId } = useLoaderData();
  const bidModalRef = useRef();
  const [bids, setBids] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for this products", data);
        setBids(data);
      });
  }, [productId]);

  const handleBidModalBox = () => {
    bidModalRef.current.showModal();
  };
  const handleSubmitModalData = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const url = e.target.url.value;
    const price = e.target.price.value;
    const countries = e.target.countries.value;
    console.log(productId, name, email, url, price, countries);

    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      buyer_url: url,
      buyer_price: price,
      buyer_countries: countries,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("buyer input data: ", data);
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Bid Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          // add the new bid to the state
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.buyer_price - a.buyer_price);
          setBids(newBids);
        }
      });
  };
  return (
    <div>
      <h1>product</h1>

      {/* modal popUp */}
      <button className="btn" onClick={handleBidModalBox}>
        open modal
      </button>

      <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            Give Seller Your Offered Price
          </h3>
          <form onSubmit={handleSubmitModalData}>
            <fieldset className="fieldset mt-5">
              <div className="flex gap-2">
                <div>
                  <label className="label">Buyer Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter your name"
                    name="name"
                    // readOnly
                    // defaultValue={user?.displayName}
                  />
                </div>
                <div>
                  <label className="label">Buyer Email</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="Enter your Email"
                    name="email"
                    // readOnly
                    // defaultValue={user?.email}
                  />
                </div>
              </div>
              <label className="label">Buyer Image URL</label>
              <input
                type="url"
                className="input w-full"
                placeholder="https://...your_img_url"
                name="url"
              />

              <label className="label">Place your Price</label>
              <input
                type="text"
                className="input w-full"
                name="price"
                placeholder="e.g. Artisan Roasters"
              />
              <label className="label">Your Countrie</label>
              <input
                type="text"
                className="input w-full"
                placeholder="e.g. Bangladesh"
                name="countries"
              />
              <div className="flex gap-1 justify-end mt-5">
                <button formMethod="dialog" className="btn mr-2">
                  Cancel
                </button>
                <button className="btn btn-neutral">Submit Bid</button>
              </div>
            </fieldset>
          </form>
        </div>
      </dialog>
      <div>
        <span>Bids for this product: {bids.length}</span>

        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                  <th>Bid Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={bid.buyer_image} alt="Image" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{bid.buyer_name}</div>
                          <div className="text-sm opacity-50">
                            {bid.buyer_countries}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {bid.buyer_email}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span>
                    </td>
                    <td>{bid.buyer_price}</td>
                    <th>
                      <button className="btn btn-neutral">details</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
