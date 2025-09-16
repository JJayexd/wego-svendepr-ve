import { ImageSlider } from "../Components/ImageSlider/ImageSlider";
import { Lift } from "../Components/Lift/Lift";
import { Text } from "../Components/Text/Text";

export const FrontPage = () => {
  return (
    <>
      {/* Mobil */}
      <div className="relative md:hidden">
        <div className="absolute inset-0 h-[300px]">
          <ImageSlider />
        </div>
        <div className="relative z-10 pt-20">
          <Lift />
        </div>
      </div>
      <Text />

      {/* Desktop */}
      <div className="hidden md:block">
        <ImageSlider />
      </div>
    </>
  );
};
