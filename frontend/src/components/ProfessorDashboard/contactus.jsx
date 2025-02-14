import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactRequests = () => {
  const [contactForms, setContactForms] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchContactForms = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/contactus/get`);
        setContactForms(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contact forms:', error);
        setLoading(false);
      }
    };

    fetchContactForms();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-blue"></div>
    </div>
  );

  return (
    <section className="py-12 px-6  min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-4xl text-center mb-12">
          User <span className="text-custom-blue">Requests</span>
        </h1>

        {Object.keys(contactForms).map((department) => (
          <div key={department} className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 capitalize">{department}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contactForms[department].map((form) => (
                <div
                  key={form._id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <h4 className="text-lg font-semibold text-gray-800">{form.name}</h4>
                  <p className="text-sm text-gray-600 mt-2">{form.email}</p>
                  {form.phone && <p className="text-sm text-gray-600 mt-1">{form.phone}</p>}
                  <p className="text-sm text-gray-600 mt-2">{form.message}</p>
                  <p className="text-xs text-gray-500 mt-4">
                    Submitted on: {new Date(form.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactRequests;