import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Devin Demo App
          </h1>
          <p className="text-lg text-gray-800 mb-8">
            A simple user management application to demonstrate behavioral testing capabilities.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/dashboard" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 block text-center"
          >
            Go to User Dashboard
          </Link>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Features</h3>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Add users with validation</li>
              <li>• Search and filter users</li>
              <li>• Delete with confirmation</li>
              <li>• Role-based badges</li>
              <li>• Responsive design</li>
            </ul>
          </div>
          
          <div className="text-center text-sm text-gray-700">
            This app includes functionality to add and delete users, perfect for testing automated migrations.
          </div>
        </div>
      </div>
    </div>
  );
}
