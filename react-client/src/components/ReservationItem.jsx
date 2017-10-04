var React = require('react');

const ReservationItem = (props) => (
<div className="res-row">
  <div className="res-data">{props.item.date}</div>
  <div className="res-data">{props.item.category}</div>
  <div className="res-data">{props.item.name}</div>
  <div className="res-data">{props.item.referenceNumber}</div>
</div>
);

export default ReservationItem;