import { useEffect, useState } from 'react';
import Image from 'next/image';

const SelectedListing = ({ selectedListingId }) => {

  const [selectedListing, setSelectedListing] = useState(null);

  const getListing = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/Listing/${selectedListingId}`);
    const responseData = await response.json();
    setSelectedListing(responseData);
  }

  useEffect(() => {
    if (selectedListingId) {
      getListing();
    }
  }, [selectedListingId]);

  return (
    <div>
      {selectedListing && (
        <div>
          <h1 className="text-4xl mt-5 mb-2">{selectedListing.name}</h1>

          <div>
            <img src={selectedListing.xlPictureUrl} alt={selectedListing.name}
                 className="rounded-2xl w-full h-[300px] object-cover"/>
          </div>

          <p>{selectedListing.description}</p>

          <h2 className="text-2xl mt-5 mb-2">Host</h2>
          <div className="flex">
            <img src={selectedListing.hostPictureUrl} alt={selectedListing.hostname}
                 className="rounded-full w-[80px] h-[80px] object-cover"/>
            <div className="flex items-center pl-5 font-bold">
              {selectedListing.hostName}
            </div>
          </div>

          <h2 className="text-2xl mt-5 mb-2">Reviews</h2>
          {selectedListing.reviews.map(review => (
            <div className="border rounded-xl p-5 mb-5" key={review.id}>
              <p className="font-bold">{review.reviewerName}</p>
              <p>{review.comments}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )

}

export default SelectedListing;
