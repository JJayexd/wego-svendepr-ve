import { ImageSlider } from "../Components/ImageSlider/ImageSlider";
import { Lift } from "../Components/Lift/Lift";

export const FrontPage = () => {
  return (
    <>
      {/* Mobilvisning */}
      <div className="relative md:hidden">
        {/* Slider bagved */}
        <div className="absolute inset-0 h-[300px]">
          <ImageSlider />
        </div>

        {/* Lift foran */}
        <div className="relative z-10 pt-20">
          <Lift />
        </div>
      </div>

      {/* Desktopvisning */}
      <div className="hidden md:block">
        <ImageSlider />
      </div>
    </>
  );
};
