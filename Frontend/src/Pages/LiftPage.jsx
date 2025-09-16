import { useState } from "react";
import { LiftSearch } from '../Components/LiftSearch/LiftSearch';
import { LiftList } from '../Components/LiftList/LiftList';

export const LiftPage = () => {   
  const [search, setSearch] = useState({
    from: "",
    to: ""
  });

  return (
    <>
      <LiftSearch search={search} setSearch={setSearch} />
      <LiftList search={search} />
    </>
  );
};
