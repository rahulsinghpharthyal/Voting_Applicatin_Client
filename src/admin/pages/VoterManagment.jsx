import React, { useState } from "react";

const VoterManagement = () => {
  const [voters, setVoters] = useState([]);
  const [form, setForm] = useState({ name: "", status: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditVoter = () => {
    if (editingIndex !== null) {
      const updatedVoters = [...voters];
      updatedVoters[editingIndex] = { ...form };
      setVoters(updatedVoters);
      setEditingIndex(null);
    } else {
      setVoters([...voters, { ...form }]);
    }
    setForm({ name: "", status: "" });
  };

  const handleEdit = (index) => {
    setForm(voters[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setVoters(voters.filter((_, i) => i !== index));
  };

  const filteredVoters = voters.filter((voter) =>
    voter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Voter Management</h1>
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

      {/* Table/List of Voters */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Voting Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVoters.length > 0 ? (
              filteredVoters.map((voter, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-50`}
                >
                  <td className="px-4 py-2">{voter.name}</td>
                  <td className="px-4 py-2">{voter.status}</td>
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
                  No voters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Voter Form */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          {editingIndex !== null ? "Edit Voter" : "Add Voter"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddOrEditVoter();
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Voter Name
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
            <label className="block text-gray-700 font-medium mb-1">
              Voting Status
            </label>
            <select
              name="status"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
              value={form.status}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Voted">Voted</option>
              <option value="Not Voted">Not Voted</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
            >
              {editingIndex !== null ? "Update Voter" : "Add Voter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoterManagement;
