import ClipLoader from "react-spinners/ClipLoader";

export function Spinner(props: any) {
  
  // spinner for loading data while to be ready

  const { loading } = props;
  return (
    <div
      className="ring-loader"
      style={{ minHeight: "100vh", display: "grid", placeContent: "center" }}
    >
      <ClipLoader size={50} color={"#f1ff00"} loading={loading} />
    </div>
  );
}

export default Spinner;
