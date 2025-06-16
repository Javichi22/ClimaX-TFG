
import React from 'react';
import { Link } from 'react-router-dom';


const AccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800 text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Acceso denegado</h1>
      <p className="mb-6">No tienes permisos para ver esta página.</p>
      <Link to="/login" className="text-blue-600 hover:underline">
        Volver al login
      </Link>
    </div>
  );
};

export default AccessDenied;
