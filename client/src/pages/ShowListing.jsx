import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { app } from '../firebase';

import { Link } from 'react-router-dom';
export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  



  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='max-w-screen-lg mx-auto'>

      {/* Banner Section */}
      <div className=" pb-[60px] pt-[120px] md:pt-[130px] lg:pt-16  ">
        <div className="container ">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full ">
              <div className="text-center">
                <h1 className="mb-4 text-3xl font-bold text-slate-700  sm:text-4xl md:text-[40px] md:leading-[1.2]">
                  Show Listing
                </h1>
                <p className="mb-5 text-base text-slate-500 ">
                  There are many variations of passages of Lorem Ipsum
                  available.
                </p>

                <ul className="flex items-center justify-center gap-[10px]">
                  <li>
                    <a
                      href="index.html"
                      className="flex items-center gap-[10px] text-base font-medium text-slate-700"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="flex items-center gap-[10px] text-base font-medium text-slate-500 ">
                      <span className="text-slate-500 "> / </span>
                      Show Listings
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>

      <button onClick={handleShowListings} className='text-green-700 w-full'>
        Update Listings
      </button>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4 py-6'>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-6 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
