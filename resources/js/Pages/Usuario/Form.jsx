import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function UsuarioForm({ auth, usuario, users }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: usuario?.name || '',
        email: usuario?.email || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = usuario ? 'usuario.update' : 'usuario.store';
        const routeId = usuario ? usuario.id : null;
        const action = usuario ? put : post;

        action(route(routeName, routeId), { data });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{usuario ? 'Modificar Usuario' : 'Crear Usuario'}</h2>}
        >
            <Head title={usuario ? 'Modificar Usuario' : 'Crear Usuario'} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={data.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                placeholder="Nombre del usuario"
                                required
                            />
                            {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={data.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                placeholder="Correo electrónico del usuario"
                                required
                            />
                            {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700"
                            >
                                {processing ? 'Guardando...' : (usuario ? 'Actualizar Usuario' : 'Crear Usuario')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
