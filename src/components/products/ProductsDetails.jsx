import React, { use, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { FaEnvelope, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const ProductsDetails = () => {
  const { user } = use(AuthContext);
  const { _id: productId } = useLoaderData();
  const bidModalRef = useRef();
  const [bids, setBids] = useState([]);
  console.log(bids);
  
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
    <div className="w-11/12 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* products descriptions */}
        <div className="col-span-1 mb-6">
          <img className="h-80 rounded-lg" src="https://images.unsplash.com/photo-1510174210589-ed6667381173?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1073" alt="" />
          <h3 className="text-xl font-semibold mb-2">Product Description</h3>
          <p>
            <span className="font-semibold">Condition:</span> New
          </p>
          <p>
            <span className="font-semibold">Usage Time:</span> 3 Month
          </p>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem Ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>
        {/* products imformations */}
        <div className="col-span-2 p-6 border border-base-300">
          <h2 className="text-2xl font-bold mb-2">Yamaha Fz Guitar For Sale</h2>
          <p className="badge badge-secondary mb-4">Art And Hobbies</p>

          <div className="text-lg font-semibold mb-2">
            Price: <span className="text-primary">$22.5 - $30</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">Price starts from</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p>
                <span className="font-semibold">Product ID:</span>{" "}
                687753ae2174ca368ec882f4
              </p>
              <p>
                <span className="font-semibold">Posted:</span> 10/19/2024
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2">
                <FaUser /> Sara Chen
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope /> crafts.by.sara@shop.net
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> Los Angeles, CA
              </p>
              <p>
                <span className="font-semibold">Contact:</span>{" "}
                sara.chen_contact
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-green-600">On Sale</span>
              </p>
            </div>
          </div>
          {/* modal popUp */}
      <button  onClick={handleBidModalBox} className="btn btn-primary w-full text-lg">
        I Want Buy This Product
      </button>
        </div>
      </div>
{/* modal popUp content */}
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
