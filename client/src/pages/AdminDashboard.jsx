import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/feedback', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFeedbacks(res.data);
        setFilteredFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedbacks", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = feedbacks.filter(f =>
      f.course.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredFeedbacks(filtered);
    setCurrentPage(1);
  }, [search, feedbacks]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeedbacks(prev => prev.filter(f => f._id !== id));
    } catch (err) {
      console.error("Error deleting feedback", err);
    }
  };

  const indexOfLast = currentPage * feedbacksPerPage;
  const indexOfFirst = indexOfLast - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredFeedbacks.length / feedbacksPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📋 All Student Feedback</h1>

        <input
          type="text"
          placeholder="Search by course name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Course</th>
                <th className="py-3 px-4 text-left">Rating</th>
                <th className="py-3 px-4 text-left">Comments</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentFeedbacks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">No feedbacks found.</td>
                </tr>
              ) : (
                currentFeedbacks.map((f, i) => (
                  <tr key={f._id} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-3 px-4">{f.name}</td>
                    <td className="py-3 px-4">{f.email}</td>
                    <td className="py-3 px-4">{f.course}</td>
                    <td className="py-3 px-4">{f.rating} ⭐</td>
                    <td className="py-3 px-4">{f.comments}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(f._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
