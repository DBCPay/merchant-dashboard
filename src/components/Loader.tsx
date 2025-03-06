import spinner from "../assets/images/brand-spinner.gif";
import spinnerPrimary from "../assets/images/spinner-primary.gif";

interface SpinnerProps {
  classNames?: string;
  type?: string;
}
interface LoaderProps {
  type?: string;
}

const spinnerMap = {
  primary: spinnerPrimary,
  base: spinner,
};

export const Spinner = ({ classNames, type = "base" }: SpinnerProps) => {
  return (
    <div
      data-testid="loader"
      className={`mx-2 max-h-[150px] inline-block my-auto ${
        classNames ? classNames : "h-6"
      }`}
    >
      <img
        src={spinnerMap[type as keyof typeof spinnerMap] || spinner}
        className="h-full"
      />
    </div>
  );
};

export const Loader = ({ type = "base" }: LoaderProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 z-[100000]">
      <div className="">
        <Spinner classNames="h-[40px]" type={type} />
      </div>
    </div>
  );
};
