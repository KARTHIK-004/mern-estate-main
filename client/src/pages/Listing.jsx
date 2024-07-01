import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { IoSchoolOutline, IoTrainOutline } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";
import { IoMdPeople } from "react-icons/io";
import {
  // FaBath,
  FaBed,
  FaChair,
  // FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaRegHospital,
  FaShare,
  FaShower,
} from "react-icons/fa";
import Contact from "../components/Contact";
import CommentContainer from "../components/comments/CommentContainer";
import Map from "../components/Map";
import FeedbackForm from "../components/star/FeedbackForm";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [rating, setRating] = useState(2);
  const [feedback, setFeedback] = useState("");

  const handleRatingChange = (event) => {
    setRating(Number(event.target.id.replace("star", "")));
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    alert(`Rating: ${rating}\nFeedback: ${feedback}`);
    // You can add an AJAX call here to send the feedback to the server
  };

  const fetchListing = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/listing/get/${params.listingId}`);
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      setListing(data);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);
  async function handleRentButton() {
    // alert("Rent button clicked");
    const res = await fetch("/api/listing/reduceBooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listingId: listing._id,
      }),
    });
    fetchListing();
    console.log(res);
  }
  const handleRatingSubmit = (rating) => {
    console.log(`You have clicked ${rating} star(s)`);
  };

  return (
    <main>
      {/* Banner Section */}
      <div className=" pb-[60px] pt-[120px] md:pt-[130px] lg:pt-16">
        <div className="container ">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full ">
              <div className="text-center">
                <h1 className="mb-4 text-3xl font-bold text-slate-700  sm:text-4xl md:text-[40px] md:leading-[1.2]">
                  Listing
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
                      Listing
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="lg:px-32 md:px-10 ">
                  <div
                    className="h-[515px]  "
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer pt">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}

          <div className="container mx-auto lg:px-16 md:px-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 p-4">
                <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4 ">
                  <p className="text-2xl font-semibold">
                    {listing.name} - ${" "}
                    {listing.offer
                      ? listing.discountPrice.toLocaleString("en-US")
                      : listing.regularPrice.toLocaleString("en-US")}
                    {listing.type === "rent" && " / month"}
                  </p>
                  <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
                    <FaMapMarkerAlt className="text-green-700" />
                    {listing.address}
                  </p>
                  <p className="flex items-center gap-2 text-red-600  text-sm">
                    Total Beds Available -{listing.availableRooms}
                  </p>

                  <p className="text-slate-700">
                    <span className="font-semibold text-slate-700">
                      Description -{" "}
                    </span>
                    {listing.description}
                  </p>
                  <div className="flex gap-4">
                    <button
                      className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md"
                      onClick={handleRentButton}
                    >
                      {listing.type === "rent" ? "For Rent" : "For Sale"}
                    </button>
                    {listing.offer && (
                      <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                        ${+listing.regularPrice - +listing.discountPrice} OFF
                      </p>
                    )}
                  </div>
                  <CommentContainer
                    className="mt-10"
                    logginedUserId={currentUser._id}
                    listingId={listing._id}
                  />
                </div>
              </div>
              <div className="flex-1 p-4 pt-10">
                <div className="features flex-2 bg-slate-200 h-max md:flex-none md:h-max md:mb-12 text-slate-700 rounded-lg">
                  <div className="wrapper p-5 flex flex-col gap-5 md:p-5">
                    <p className="title font-semibold text-2xl mb-2 text-black">
                      General :
                    </p>
                    <div className="listVertical flex flex-col gap-5 p-5 bg-white rounded-lg ">
                      <div className="feature flex items-center gap-2.5">
                        <FaChair className="text-lg w-6 h-6" />
                        <div className="">
                          <span className="font-semibold ">Furnisher</span>
                          <p className="text-sm text-slate-500">
                            {listing.furnished ? "Furnished" : "Unfurnished"}
                          </p>
                        </div>
                      </div>
                      <div className="feature flex items-center gap-2.5">
                        <FaParking className="text-lg w-6 h-6" />
                        <div className="featureText">
                          <span className="font-semibold">Parking Spot</span>
                          <p className="text-sm text-slate-500">
                            {listing.parking
                              ? "Parking Available"
                              : "No Parking"}
                          </p>
                        </div>
                      </div>
                      <div className="feature flex items-center gap-2.5">
                        <IoMdPeople className="w-6 h-6" />
                        <div className="featureText">
                          <span className="font-semibold">Guest</span>
                          <p className="text-sm text-slate-500">
                            Guest Not Allowed
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="title font-semibold text-lg mb-2 text-black">
                      Sizes :
                    </p>
                    <div className="sizes flex justify-between lg:text-xs">
                      <div className="size flex items-center gap-2.5 bg-white p-2.5 rounded">
                        <SlSizeFullscreen className="w-6 h-6" />
                        <span className="font-bold">80 Sqft</span>
                      </div>
                      <div className="size flex items-center gap-2.5 bg-white p-2.5 rounded">
                        <FaBed className="w-6 h-6" />
                        <span className="font-bold">
                          {listing.bedrooms > 1
                            ? `${listing.bedrooms} Beds `
                            : `${listing.bedrooms} Bed `}
                        </span>
                      </div>
                      <div className="size flex items-center gap-2.5 bg-white p-2.5 rounded">
                        <FaShower className="w-6 h-6" />
                        <span className="font-bold">
                          {listing.bathrooms > 1
                            ? `${listing.bathrooms} Baths `
                            : `${listing.bathrooms} Bath `}
                        </span>
                      </div>
                    </div>
                    <p className="title font-semibold text-lg mb-2 text-black">
                      Nearby Places :
                    </p>
                    <div className="listHorizontal flex justify-between p-5 bg-white rounded-lg">
                      <div className="feature flex items-center gap-2.5">
                        <IoSchoolOutline className="w-6 h-6" />
                        <div className="featureText">
                          <span className="font-semibold">College</span>
                          <p className="text-sm text-slate-500">250m away</p>
                        </div>
                      </div>
                      <div className="feature flex items-center gap-2.5">
                        <IoTrainOutline className="w-6 h-6" />
                        <div className="featureText">
                          <span className="font-semibold">Metro</span>
                          <p className="text-sm text-slate-500">100m away</p>
                        </div>
                      </div>
                      <div className="feature flex items-center gap-2.5">
                        <FaRegHospital className="w-6 h-6" />
                        <div className="featureText">
                          <span className="font-semibold">Hospital</span>
                          <p className="text-sm">200m away</p>
                        </div>
                      </div>
                    </div>
                    <p className="font-semibold text-2xl mb-2 text-black">
                      Location :
                    </p>
                    <div className="mapContainer w-full h-64 ">
                      <Map listing={listing} />
                    </div>
                    {currentUser &&
                      listing.userRef !== currentUser._id &&
                      !contact && (
                        <button
                          onClick={() => setContact(true)}
                          className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                        >
                          Contact landlord
                        </button>
                      )}
                    {contact && <Contact listing={listing} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
