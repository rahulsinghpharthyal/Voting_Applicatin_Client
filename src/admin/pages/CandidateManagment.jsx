import React, { useState } from "react";

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState([]);
  const [form, setForm] = useState({ name: "", party: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditCandidate = () => {
    if (editingIndex !== null) {
      const updatedCandidates = [...candidates];
      updatedCandidates[editingIndex] = { ...form };
      setCandidates(updatedCandidates);
      setEditingIndex(null);
    } else {
      setCandidates([...candidates, { ...form }]);
    }
    setForm({ name: "", party: "" });
  };

  const handleEdit = (index) => {
    setForm(candidates[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setCandidates(candidates.filter((_, i) => i !== index));
  };

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Candidate Management</h1>
      </header>

      {/* Search Bar and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table/List of Candidates */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Party</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-50`}
                >
                  <td className="px-4 py-2">{candidate.name}</td>
                  <td className="px-4 py-2">{candidate.party}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center text-gray-500 py-4 italic"
                >
                  No candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Candidate Form */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          {editingIndex !== null ? "Edit Candidate" : "Add Candidate"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddOrEditCandidate();
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Candidate Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Party</label>
            <input
              type="text"
              name="party"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
              value={form.party}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
            >
              {editingIndex !== null ? "Update Candidate" : "Add Candidate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateManagement;
