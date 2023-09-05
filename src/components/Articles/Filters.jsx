import { useState } from "react";

const Filters = ({ copyParams, sortByTopic, setSearchParams }) => {
  const [sortBy, setSortBy] = useState(undefined);
  const [order, setOrder] = useState(undefined);
  const [isHidden, setisHidden] = useState(true);

  const handleSortChange = (event) => {
    if (event.target.value !== "None") {
      setSortBy(event.target.value);
    }
  };

  const handleOrderChange = (event) => {
    if (event.target.value !== "None") {
      setOrder(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams((currParams) => {
      if (sortBy && order && sortByTopic) {
        return {
          ...currParams,
          sort_by: sortBy,
          order: order,
          topic: sortByTopic,
        };
      } else if (sortBy && !order && sortByTopic) {
        return { ...currParams, sort_by: sortBy, topic: sortByTopic };
      } else if (!sortBy && order && sortByTopic) {
        return { ...currParams, order: order, topic: sortByTopic };
      } else if (sortBy && order && !sortByTopic) {
        return { ...currParams, order: order, sort_by: sortBy };
      } else if (sortBy && !order && !sortByTopic) {
        return { ...currParams, sort_by: sortBy };
      } else if (!sortBy && order && !sortByTopic) {
        return { ...currParams, order: order };
      }
    });
  };

  return (
    <section>
      <button
        onClick={() => {
          setisHidden(!isHidden);
        }}
      >
        {isHidden ? 'Show filters': 'Hide filters'}
      </button>
      <form className="filter-form" hidden={isHidden} onSubmit={handleSubmit}>
        <div>
          <label className="filter-label" htmlFor="sort_by">
            Sort by
            <select
              className="filter-select"
              id="sort_by"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="" selected disabled hidden>
                Choose here
              </option>
              <option value={undefined}>None</option>
              <option value="created_at">Date</option>
              <option value="comment_count">Comment Count</option>
              <option value="votes">Votes</option>
            </select>
          </label>
        </div>
        <div>
          <label className="filter-label" htmlFor="order">
            Order
            <select
              className="filter-select"
              id="order"
              value={order}
              onChange={handleOrderChange}
            >
              <option value="" selected disabled hidden>
                Choose here
              </option>
              <option value={undefined}>None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
        <button disabled={!order && !sortBy}>Apply filters!</button>
      </form>
    </section>
  );
};

export default Filters;
