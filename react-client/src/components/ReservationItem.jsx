var React = require('react');

const ReservationItem = (props) => (
<div className="res-row">
  <div className="res-data">{props.item.date}</div>
  <div className="res-data">{props.item.time}</div>
  <div className="res-data">{props.item.type}</div>
  <div className="res-data">{props.item.name}</div>
  <div className="res-data">{props.item.reference}</div>
</div>
)

export default ReservationItem