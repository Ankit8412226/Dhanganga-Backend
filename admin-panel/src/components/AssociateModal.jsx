import { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { XMarkIcon } from '@heroicons/react/24/outline';
import api from '../config/api';

export default function AssociateModal({ isOpen, onClose, associate }) {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    subService: '',
    type: '',
    bio: '',
    amount: '',
    time: '',
    file: null
  });
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await api.get('/service/services');
      return response.data.data;
    }
  });

  const { data: subServices } = useQuery({
    queryKey: ['subservices', formData.service],
    queryFn: async () => {
      if (!formData.service) return [];
      const response = await api.get(`/service/subservices?service=${formData.service}`);
      return response.data.data;
    },
    enabled: !!formData.service
  });

  const { data: types } = useQuery({
    queryKey: ['types', formData.subService],
    queryFn: async () => {
      if (!formData.subService) return [];
      const response = await api.get(`/service/types?subService=${formData.subService}`);
      return response.data.data;
    },
    enabled: !!formData.subService
  });

  useEffect(() => {
    if (associate) {
      setFormData({
        name: associate.name || '',
        service: associate.service?._id || '',
        subService: associate.subService?._id || '',
        type: associate.type?._id || '',
        bio: associate.bio || '',
        amount: associate.amount || '',
        time: associate.time || '',
        file: null
      });
    } else {
      setFormData({
        name: '',
        service: '',
        subService: '',
        type: '',
        bio: '',
        amount: '',
        time: '',
        file: null
      });
    }
  }, [associate]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const formDataToSend = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'file' && data[key]) {
          formDataToSend.append('file', data[key]);
        } else if (key !== 'file') {
          formDataToSend.append(key, data[key]);
        }
      });

      if (associate) {
        return await api.put(`/service/associates/${associate._id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        return await api.post('/service/associates', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['associates']);
      onClose();
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await mutation.mutateAsync(formData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {associate ? 'Edit Associate' : 'Add New Associate'}
                  </Dialog.Title>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field mt-1"
                      placeholder="Enter associate name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Service
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="input-field mt-1"
                      >
                        <option value="">Select a service</option>
                        {services?.map((service) => (
                          <option key={service._id} value={service._id}>
                            {service.serviceName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sub Service
                      </label>
                      <select
                        name="subService"
                        value={formData.subService}
                        onChange={handleChange}
                        required
                        className="input-field mt-1"
                        disabled={!formData.service}
                      >
                        <option value="">Select a sub service</option>
                        {subServices?.map((subService) => (
                          <option key={subService._id} value={subService._id}>
                            Fee: ₹{subService.fee}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="input-field mt-1"
                      disabled={!formData.subService}
                    >
                      <option value="">Select a type</option>
                      {types?.map((type) => (
                        <option key={type._id} value={type._id}>
                          {type.type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="input-field mt-1"
                      placeholder="Enter bio/description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Amount
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="input-field mt-1"
                        placeholder="Enter amount"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Time
                      </label>
                      <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="input-field mt-1"
                        placeholder="e.g., 1-2 hours"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      File
                    </label>
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      className="input-field mt-1"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                    >
                      {loading ? 'Saving...' : (associate ? 'Update' : 'Create')}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}