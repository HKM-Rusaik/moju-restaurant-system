import Item from "./Item";
import { SERVICES, DELIVERIES, COMPANY, SUPPORT } from "./Menu";

const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 sm:px-8 px-5 py-16">
      <Item Links={SERVICES} title="SERVICES" />
      <Item Links={DELIVERIES} title="DELIVERIES" />
      <Item Links={COMPANY} title="COMPANY" />
      <Item Links={SUPPORT} title="SUPPORT" />
    </div>
  );
};

export default ItemsContainer;
