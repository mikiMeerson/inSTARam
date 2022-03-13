import ListGenerator from '../../general/listGenerator';

const EventSummary = () => (
  <div className="summary">
    <ListGenerator header="הערות" />
    <ListGenerator header="מסקנות והמלצות ראשוניות" />
    <ListGenerator header="מטלות וכוונות להמשך" />
  </div>
);

export default EventSummary;
