import { useQuery } from '@tanstack/react-query';
import api from '../config/api';

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['contact-stats'],
    queryFn: async () => {
      const response = await api.get('/contact/contact/stats');
      return response.data.data;
    }
  });

  const { data: services } = useQuery({
    queryKey: ['services-count'],
    queryFn: async () => {
      const response = await api.get('/service/services');
      return response.data;
    }
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Overview of your admin panel statistics
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold">S</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Services</p>
              <p className="text-2xl font-semibold text-gray-900">{services?.count || 0}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-semibold">C</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Contacts</p>
              <p className="text-2xl font-semibold text-gray-900">{stats?.totalContacts || 0}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 font-semibold">P</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Contacts</p>
              <p className="text-2xl font-semibold text-gray-900">{stats?.pendingContacts || 0}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-semibold">R</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Resolved Contacts</p>
              <p className="text-2xl font-semibold text-gray-900">{stats?.resolvedContacts || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {stats && (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Status Distribution</h3>
            <div className="space-y-3">
              {stats.statusStats?.map((stat) => (
                <div key={stat._id} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{stat._id}</span>
                  <span className="text-sm font-medium text-gray-900">{stat.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Categories</h3>
            <div className="space-y-3">
              {stats.categoryStats?.map((stat) => (
                <div key={stat._id} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{stat._id}</span>
                  <span className="text-sm font-medium text-gray-900">{stat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}