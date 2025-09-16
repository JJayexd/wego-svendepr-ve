import { useState } from 'react';
import { LiftSearch } from '../Components/LiftSearch/LiftSearch';
import { LiftList } from '../Components/LiftList/LiftList';
import { LiftFilter } from "../Components/LiftFilter/LiftFilter";

export const LiftPage = () => {   
  const [search, setSearch] = useState({
    from: "",
    to: ""
  });

  return (
    <>
      <LiftSearch search={search} setSearch={setSearch} />     
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 mt-4 gap-6">
        <div className="hidden md:block w-[220px]">
          <LiftFilter />
        </div>
        <div className="">
          <LiftList search={search} />
        </div>
      </div>
    </>
  );
};
