import { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import Select from '../core/Select';
import 'rc-slider/assets/index.css';

const Filters = ({ setFilters, maxPrice, neighbourhoods, maxReviews }) => {

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
      <Slider min={0} max={maxPrice} defaultValue={300} onChange={(priceValue) => setPriceFilter(priceValue)} />

      <h3>Neighbourhood</h3>
      <Select title={'All'} options={neighbourhoods} onChange={(e) => setNeighbourhoodFilter(e.target.value)}></Select>

      <h3>Reviews</h3>
      <Slider min={0} max={maxReviews} defaultValue={0} onChange={(reviewsValue) => setReviewsFilter(reviewsValue)} />

    </div>
  )
};

export default Filters;
