import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Edit = ({ usuario }) => {
    const [name, setName] = useState(usuario.name);
    const [email, setEmail] = useState(usuario.email);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/usuarios/${usuario.id}`, { name, email });
    };

    return (
        <div className="container">
            <h1>Editar Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Actualizar</button>
                <Link href="/usuarios" className="btn btn-secondary">Cancelar</Link>
            </form>
        </div>
    );
};

export default Edit;
