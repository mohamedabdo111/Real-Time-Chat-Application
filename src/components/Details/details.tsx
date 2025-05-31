import { auth } from "@/lib/firebase";
import React from "react";

const Details = () => {
  return (
    <div className=" flex-1">
      <button onClick={() => auth.signOut()}>logout</button>
    </div>
  );
};

export default Details;
