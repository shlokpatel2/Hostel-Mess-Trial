import React, { useState } from 'react';
import { Camera, Send, AlertTriangle } from 'lucide-react';
import { complaintCategories } from '../../data/mockData';
import { useComplaints } from '../../hooks/useDatabase';

interface ComplaintsSectionProps {
  studentId: string;
  studentName: string;
}

const ComplaintsSection: React.FC<ComplaintsSectionProps> = ({ studentId, studentName }) => {
  const [complaint, setComplaint] = useState({
    category: '',
    description: '',
    image: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { createComplaint } = useComplaints();
  const { createComplaint } = useComplaints();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setComplaint({ ...complaint, image: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createComplaint({
        studentId,
        studentName,
        category: complaint.category,
        description: complaint.description,
        imageUrl: complaint.image ? 'placeholder-image-url' : null
      });
      
      setIsSubmitting(false);
      setSubmitted(true);
      setComplaint({ category: '', description: '', image: null });
      
      // Reset form after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      setIsSubmitting(false);
      console.error('Failed to submit complaint:', error);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Complaint Submitted!</h3>
        <p className="text-gray-600">
          Your complaint has been received and will be reviewed by the mess committee.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Submit a Complaint</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Category of Issue *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {complaintCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setComplaint({ ...complaint, category })}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    complaint.category === category
                      ? 'bg-red-50 border-red-300 text-red-800'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Upload Image (Optional)
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  {complaint.image ? complaint.image.name : 'Click to upload an image'}
                </span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Detailed Description *
            </label>
            <textarea
              value={complaint.description}
              onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
              placeholder="Please provide detailed information about the issue you encountered..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!complaint.category || !complaint.description || isSubmitting}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Complaint</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Guidelines */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">Guidelines for Filing Complaints</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Be specific and provide as much detail as possible</li>
          <li>• Include photos when relevant (food quality, hygiene issues, etc.)</li>
          <li>• Complaints are reviewed within 24-48 hours</li>
          <li>• False or malicious complaints may result in penalties</li>
        </ul>
      </div>
    </div>
  );
};

export default ComplaintsSection;