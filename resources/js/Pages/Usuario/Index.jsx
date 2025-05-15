import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ auth, usuarios }) {
    const [nombre, setNombre] = useState('');
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [allUsuarios, setAllUsuarios] = useState([]);

    useEffect(() => {
        console.log("Usuarios recibidos:", usuarios); // 👈 Agrega esto
        if (usuarios && Array.isArray(usuarios.data)) {
            setAllUsuarios(usuarios.data);
            setFilteredUsuarios(usuarios.data);
        }
    }, [usuarios]);
    

    const handleSearch = () => {
        let filtered = allUsuarios;

        if (nombre) {
            filtered = filtered.filter(user => user.name.toLowerCase().includes(nombre.toLowerCase()));
        }

        setFilteredUsuarios(filtered);
    };

    const handleDelete = (id) => {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            fetch(route('usuario.destroy', id), {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,
                },
            }).then(() => {
                setFilteredUsuarios(filteredUsuarios.filter((user) => user.id !== id));
                setAllUsuarios(allUsuarios.filter((user) => user.id !== id)); // Actualiza allUsuarios también
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Usuarios</h2>}
        >
            <Head title="Usuarios" />

            <div className="py-12">
                <div className="mb-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="nombre" className="font-medium text-gray-700">Buscar por Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            placeholder="Ingrese el nombre"
                        />
                        
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Buscar
                        </button>
                    </div>
                </div>

                {/* Sección de la tabla */}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 bg-gray-50">
                    <thead className="text-sx text-gray-700 bg-gray-200">
                        <tr className="text-nowrap">
                            <th className="px-3 py-3">ID</th>
                            <th className="px-3 py-3">Nombre</th>
                            <th className="px-3 py-3">Correo Electrónico</th>
                            <th className="px-3 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsuarios.length > 0 ? (
                                filteredUsuarios.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Link
                                                href={route('usuario.edit', user.id)}
                                                className="text-blue-500 hover:text-blue-700 mr-4"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">No hay datos disponibles</td>
                                </tr>
                            )}
                    </tbody>
                </table>

                <div className="flex justify-center mt-4 space-x-4">
                    <Link href={route('usuario.create')} className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-700">➕ NUEVO</Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
