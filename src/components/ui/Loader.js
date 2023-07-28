import BarLoader from "react-spinners/BarLoader";

const override = {
    display: "block",
    margin: "10rem auto",
    borderColor: "red",
};

const Loader = () => {
    return (
        <BarLoader
            cssOverride={override}
            size={150}
            color="#fff"
        />
    )
}
export default Loader;