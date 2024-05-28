import useFetchData from "./FetchData";

function PokeFight() {
  const { entries, isLoading } = useFetchData();
  console.log(entries);
  return <div>PokeFight</div>;
}

export default PokeFight;
