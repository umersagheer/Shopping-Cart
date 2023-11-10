import StoreItem from "../components/StoreItem";
import StoreItems from "../data/items.json";

const Store = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {StoreItems.map((item) => (
          <StoreItem key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default Store;
