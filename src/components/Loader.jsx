import "../styles/style.css"

const Loader = ({Text}) => {
  return (
    <>
      <div className="Loader__Main">
        {/* <div className="Loader"></div> */}
        <div className="flex space-x-2 items-center">
        <div className="BoxOne"></div>
        <div className="BoxTwo"></div>
        </div>
        <h4 className="text-[11px] text-neutral-100 font-semibold mt-3">{Text}</h4>
        {/* <div className="Image_Loader"><img src="/assets/Logo.svg" alt="logo" className="w-[2rem] h-[2rem] object-contain" /></div> */}
      </div>
      <div className="Loader__Container"></div>
    </>
  );
};

Loader.defaultProps = {
  Text : ""
}

export default Loader;
