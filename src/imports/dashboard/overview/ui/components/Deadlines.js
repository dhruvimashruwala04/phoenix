import React from "react";
import Card from "./Card";

const Deadlines = () => {
  return (
    <Card
      title="Upcoming Deadlines"
      showLink={true}
      linkText="Calendar →"
      linkHref={"/calendar"}
    ></Card>
  );
};

export default Deadlines;
