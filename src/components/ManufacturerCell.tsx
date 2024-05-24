/**
 * Licensed Materials - Property of IBM
 * 5737-M66, 5900-AAA, 5900-A0N, 5725-S86, 5737-I75
 * © Copyright IBM Corp. 2020, 2024 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
import React from "react";

const defaultProps = {
  logo: undefined,
  name: undefined,
};

const ManufacturerCell: React.FC<{
  logo?: string;
  name?: string;
}> = ({ logo, name }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    {logo && logo !== null && logo !== "" ? (
      <img
        style={{ width: "2rem", height: "2rem", marginRight: "1rem" }}
        src={`data:image/png;base64, ${logo}`}
        alt={name ?? logo}
      />
    ) : (
      <div style={{ width: "2rem", height: "2rem", marginRight: "1rem" }} />
    )}
    {name ? <span>{name}</span> : null}
  </div>
);

ManufacturerCell.defaultProps = defaultProps;
export default ManufacturerCell;
