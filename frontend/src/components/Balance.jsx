export function Balance({ value }) {
  return (
    <div className="flex">
      <div className="font-bold  mt-0.5 mr-10">Your Balance</div>
      <div className="font-semibold text-lg ">Rs {value}</div>
    </div>
  );
}
