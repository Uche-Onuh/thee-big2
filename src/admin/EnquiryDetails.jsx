import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

const EnquiryDetails = () => {
  const [enquiry, setEnquiry] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const docRef = doc(db, "enquiry", id);

    useEffect(() => {
      try {
        const getEnquiry = async () => {
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setEnquiry(docSnap.data());
            setLoading(false);
          } else {
            console.log("No enquiry found");
          }
        };
        getEnquiry();
      } catch (err) {
        console.log(err);
      }
    }, []);

  return <div>EnquiryDetails</div>;
};

export default EnquiryDetails;
