export default function Line({idx, lineData}) {
  return (
    <div className="line">
      <div className="register">{idx + 1}</div>
      { lineData.map((items, i) => <div key={i} className="customer">{items}</div>) }
    </div>
  );
}