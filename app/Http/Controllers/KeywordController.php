<?php

namespace App\Http\Controllers;

use App\Models\Keyword;
use Illuminate\Http\Request;

class KeywordController extends Controller
{
    /**
     * Retorna todas as palavras-chave.
     */
    public function index(Request $request)
    {
        $query = Keyword::query();

        if ($request->has('site_id')) {
            $query->where('site_id', $request->input('site_id'));
    }

    $keywords = $query->get();

    return response()->json($keywords);
}


/** Cria uma nova palavra-chave.
 */
public function store(Request $request)
{
    $data = $request->validate([
        'site_id' => 'required|exists:sites,id',
        'title'   => 'required|string|max:255',
        ]);

    $keyword = Keyword::create($data);

    return response()->json($keyword, 201);
    }

    /**
     * Exibe uma palavra-chave específica.
     */
    public function show($id)
    {
        $keyword = Keyword::findOrFail($id);
        return response()->json($keyword);
    }

    /**
     * Atualiza os dados de uma palavra-chave.
     */
    public function update(Request $request, $id)
    {
        $keyword = Keyword::findOrFail($id);

        $data = $request->validate([
            'site_id' => 'sometimes|required|exists:sites,id',
            'title'   => 'sometimes|required|string|max:255',
            'slug'    => 'sometimes|required|string|max:255|unique:keywords,slug,'.$keyword->id,
            'content' => 'sometimes|required|string'
        ]);

        $keyword->update($data);

        return response()->json($keyword);
    }

    /**
     * Remove uma palavra-chave.
     */
    public function destroy($id)
    {
        $keyword = Keyword::findOrFail($id);
        $keyword->delete();
        return response()->json(null, 204);
    }
}

