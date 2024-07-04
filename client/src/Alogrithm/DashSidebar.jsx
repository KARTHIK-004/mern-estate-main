import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOutUserSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutUserSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full   md:w-56 bg-slate-200 sm:h-[100%] ">
      <div className="flex flex-col p-4 gap-1">
        {currentUser && (
          <Link
            to="/dashboard?tab=dash"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100"
          >
            <HiChartPie
              className={`text-2xl ${
                tab === "dash" || !tab ? "text-blue-500" : "text-slate-700"
              }`}
            />
            <span
              className={`${
                tab === "dash" || !tab ? "text-blue-500" : "text-slate-700"
              }`}
            >
              Dashboard
            </span>
          </Link>
        )}
        <Link
          to="/dashboard?tab=profile"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100"
        >
          <HiUser
            className={`text-2xl ${
              tab === "profile" ? "text-blue-500" : "text-slate-700"
            }`}
          />
          <span
            className={`${
              tab === "profile" ? "text-blue-500" : "text-slate-700"
            }`}
          >
            Profile
          </span>
          {currentUser && (
            <span className="ml-auto text-xs text-slate-700">Admin</span>
          )}
        </Link>
        {currentUser && (
          <>
            <Link
              to="/dashboard?tab=posts"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100"
            >
              <HiDocumentText
                className={`text-2xl ${
                  tab === "posts" ? "text-blue-500" : "text-slate-700"
                }`}
              />
              <span
                className={`${
                  tab === "posts" ? "text-blue-500" : "text-slate-700"
                }`}
              >
                Create Listing
              </span>
            </Link>
            <Link
              to="/dashboard?tab=users"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100"
            >
              <HiOutlineUserGroup
                className={`text-2xl ${
                  tab === "users" ? "text-blue-500" : "text-slate-700"
                }`}
              />
              <span
                className={`${
                  tab === "users" ? "text-blue-500" : "text-slate-700"
                }`}
              >
                Users
              </span>
            </Link>
            <Link
              to="/dashboard?tab=comments"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100"
            >
              <HiAnnotation
                className={`text-2xl ${
                  tab === "comments" ? "text-blue-500" : "text-slate-700"
                }`}
              />
              <span
                className={`${
                  tab === "comments" ? "text-blue-500" : "text-slate-700"
                }`}
              >
                Comments
              </span>
            </Link>
          </>
        )}
        <div
          onClick={handleSignout}
          className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-slate-100"
        >
          <HiArrowSmRight className="text-2xl text-slate-700" />
          <span className="text-slate-700">Sign Out</span>
        </div>
      </div>
    </div>
  );
}
