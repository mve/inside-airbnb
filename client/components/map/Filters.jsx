import { useEffect, useState } from 'react';

const Filters = ({ setFilters }) => {

  const [priceFilter, setPriceFilter] = useState(250);
  const [neighbourhoodFilter, setNeighbourhoodFilter] = useState('');
  const [reviewsFilter, setReviewsFilter] = useState(0);

  useEffect(() => updateFilters(), [priceFilter, neighbourhoodFilter, reviewsFilter])

  const updateFilters = () => {

    setFilters({
      priceFilter,
      neighbourhoodFilter,
      reviewsFilter
    });
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Filters</h2>

      <h3>Price</h3>
      <input type="number" onChange={(e) => setPriceFilter(e.target.value)}/>

      <h3>Neighbourhood</h3>
      <input type="text" onChange={(e) => setNeighbourhoodFilter(e.target.value)}/>

      <h3>Reviews</h3>
      <input type="number" onChange={(e) => setReviewsFilter(e.target.value)}/>

    </div>
  )
};

export default Filters;
