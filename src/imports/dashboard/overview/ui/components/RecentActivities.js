import React from "react";
import Card from "./Card";

const RecentActivities = () => {
  return (
    <Card
      title="Recent activity"
      showLink={true}
      linkText="View all →"
      linkHref={"/activity"}
    ></Card>
  );
};

export default RecentActivities;
