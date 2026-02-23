<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Aula;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function create($aulaId)
    {

        $user = auth()->user();

        $aula = Aula::findOrFail($aulaId);

        if(($user->rol !== 'A')&&($user->rol !== 'P' || $aula->profesor_cedula !== $user->cedula)) {
            abort(403, 'Acceso no autorizado');
        }

        if($user->rol === 'P'){
            $directorio = 'profesor';
        }else{
            $directorio = 'admin';
        }   

        return Inertia::render("{$directorio}/posts/create", [
            'aulaId' => $aulaId,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'aula_id' => 'required|exists:aulas,id',
            'contenido' => 'required|string|max:2000',
        ]);

        $user = auth()->user();

        $aula = Aula::findOrFail($request->aula_id);

        if(($user->rol !== 'A')&&($user->rol !== 'P' || $aula->profesor_cedula !== $user->cedula)) {
            abort(403, 'Acceso no autorizado');
        }


        Post::create([
            'aula_id' => $request->aula_id,
            'contenido' => $request->contenido,
        ]);

        return redirect()->route('aulasAccess', ['id' => $request->aula_id])
            ->with('success', 'Post creado exitosamente.');
    }

    public function edit($postId)
    {
        $post = Post::findOrFail($postId);

        $user = auth()->user();

        if(($user->rol !== 'A')&&($user->rol !== 'P' || $post->aula->profesor_cedula !== $user->cedula)) {
            abort(403, 'Acceso no autorizado');
        }

        if($user->rol === 'P'){
            $directorio = 'profesor';
        }else{
            $directorio = 'admin';
        }   

        return Inertia::render("{$directorio}/posts/edit", [
            'post' => [
                'id' => $post->id,
                'aula_id' => $post->aula_id,
                'contenido' => $post->contenido,
            ],
        ]);
    }

    public function update(Request $request, $postId)
    {
        $post = Post::findOrFail($postId);

        $user = auth()->user();

        if(($user->rol !== 'A')&&($user->rol !== 'P' || $post->aula->profesor_cedula !== $user->cedula)) {
            abort(403, 'Acceso no autorizado');
        }


        $request->validate([
            'contenido' => 'required|string|max:2000',
        ]);

        $post->update([
            'contenido' => $request->contenido,
        ]);

        return redirect()->route('aulasAccess', ['id' => $post->aula_id])
            ->with('success', 'Post actualizado exitosamente.');
    }

    public function destroy($postId)
    {

        $post = Post::findOrFail($postId);
        $aulaId = $post->aula_id;

        $user = auth()->user();

        if(($user->rol !== 'A')&&($user->rol !== 'P' || $post->aula->profesor_cedula !== $user->cedula)) {
            abort(403, 'Acceso no autorizado');
        }

        $post->delete();

        return redirect()->route('aulasAccess', ['id' => $aulaId])
            ->with('success', 'Post eliminado exitosamente.');
    }
}
