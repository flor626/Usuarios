<?php

namespace App\Http\Controllers;
use App\Models\Usuario;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usuarios = Usuario::all(); 
        return Inertia::render("Usuario/Index", ['usuarios' => $usuarios]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Usuario/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|max:100|unique:usuarios',
        ]);

        Usuario::create($data);
        return redirect(route('usuario.index'))->with('success', 'Usuario agregado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Usuario $usuario)
    {
        return Inertia::render('Usuario/Show', [
            'usuario' => $usuario
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $usuario = Usuario::findOrFail($id);
        return Inertia::render('Usuario/Form', ['usuario' => $usuario]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'string|max:100',
            'email' => 'string|email|max:100|unique:usuarios,email,' . $id,
        ]);

        $usuario = Usuario::findOrFail($id);
        $usuario->update($request->all());

        return redirect()->route('usuario.index')->with('success', 'Usuario actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Usuario::destroy($id);
        return redirect()->route('usuario.index')->with('success', 'Usuario eliminado correctamente');
    }
}
