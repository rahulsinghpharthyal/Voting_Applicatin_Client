import React, { useState, useRef, useEffect } from "react";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCandidate, getAllCandidate, updateCandidate } from "../../redux/actions/candidateAction";
import { axiosPrivate } from "../../customAxios/privateAxios";
import { useLocation } from "react-router-dom";

const AddCandidateForm = () => {
  const [formData, setFormData] = useState({
    candidateAahaarId: "",
    candidatename: "",
    party: "",
    electionSymbol: "",
  });

  const [imageUploading, setImageUploading] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const location = useLocation();
  const editCandidate = location?.state?.candidate;

  console.log(editCandidate);
  useEffect(() => {
    if (editCandidate) {
      setFormData({
        candidateAahaarId: editCandidate.aadhaarId || "",
        candidatename: editCandidate.candidatename || "",
        party: editCandidate.party || "",
        electionSymbol: editCandidate.electionSymbol || "",
      });
    }
  }, [editCandidate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (
        !formData.candidatename ||
        !formData.candidateAahaarId ||
        !formData.party ||
        !formData.electionSymbol
      ) {
        toast.warn("All fields are Required");
        return;
      }
      let response;
      if (editCandidate) {
        response = await dispatch(updateCandidate({candidateId: editCandidate?._id, formData}));
      } else {
        response = await dispatch(createCandidate(formData));
      }
        if (response?.payload?.success) {
          toast.success(response?.payload?.message);
          // dispatch(getAllCandidate());
          setFormData({
            candidateAahaarId: "",
            candidatename: "",
            party: "",
            electionSymbol: "",
          });
          if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear the file input value }
          }
        } else {
          toast.error(response.payload);
        }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (e) => {
    setImageUploading(true);
    try {
      const file = e.target.files[0];
      const allowedFile = ["image/jpeg", "image/png"];
      if (!allowedFile.includes(file.type)) {
        toast.warn("Please seleted the Jpeg/png file formet");
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear the file input value }
        }
      }
      const fileData = new FormData();
      fileData.append("file", file);
      const { data } = await axiosPrivate.post(
        "/api/v1/candidate/symbol-upload",
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setImageUploading(false);
        setFormData((prevState) => ({
          ...prevState,
          electionSymbol: data?.Data?.secure_url,
        }));
      }
    } catch (error) {
      toast.warn(error?.response?.data?.message || "Unexpected File");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input value }
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData((prevState) => ({ ...prevState, electionSymbol: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input value }
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-20">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {editCandidate ? "Edit Candidate" : "Add Candidate"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="candidateName"
          >
            Aadhaar Id
          </label>
          <input
            type="number"
            id="candidateAahaarId"
            name="candidateAahaarId"
            value={formData.candidateAahaarId}
            onChange={handleOnChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="candidateName"
          >
            Candidate Name
          </label>
          <input
            type="text"
            id="candidatename"
            name="candidatename"
            value={formData.candidatename}
            onChange={handleOnChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="party"
          >
            Party
          </label>
          <input
            type="text"
            id="party"
            name="party"
            value={formData.party}
            onChange={handleOnChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="electionIcon"
          >
            Election Icon{" "}
            <span className="text-[12px] font-normal text-red-500 ml-3">
              (Image size should be less then 100kb and supported jpeg/png
              formet only.)
            </span>
          </label>
          {/* <p>Image formet should be jpeg/png formet and file should be less then 100kb.</p> */}
          <input
            type="file"
            id="electionIcon"
            name="electionIcon"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {formData?.electionSymbol && (
          <div className="mb-4">
            {" "}
            <img
              src={formData.electionSymbol}
              alt="Election Icon"
              className="w-32 h-32 object-cover"
            />{" "}
            <button
              type="button"
              onClick={() => handleRemoveImage()}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              {" "}
              Remove{" "}
            </button>{" "}
          </div>
        )} {
          imageUploading && <p>Image Upoading Please Wait....</p>
        }
        <div className="flex items-center justify-end mt-10">
          <button
            type="submit"
            className="bg-[#1f2937] hover:bg-[#0c0f12] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
           {editCandidate ? "Edit" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCandidateForm;
