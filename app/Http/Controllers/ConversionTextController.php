<?php

namespace App\Http\Controllers;

use App\Models\ConversionText;
use Illuminate\Http\Request;

class ConversionTextController extends Controller
{
    /**
     * Retorna todos os textos de conversão.
     */
    public function index()
    {
        $texts = ConversionText::all();
        return response()->json($texts);
    }

    /**
     * Cria um novo texto de conversão.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'site_id' => 'required|exists:sites,id',
            'title'   => 'required|string|max:255',
            'slug'    => 'required|string|max:255|unique:conversion_texts',
            'content' => 'required|string'
        ]);

        $conversionText = ConversionText::create($data);

        return response()->json($conversionText, 201);
    }

    /**
     * Exibe um texto de conversão específico.
     */
    public function show($id)
    {
        $conversionText = ConversionText::findOrFail($id);
        return response()->json($conversionText);
    }

    /**
     * Atualiza os dados de um texto de conversão.
     */
    public function update(Request $request, $id)
    {
        $conversionText = ConversionText::findOrFail($id);

        $data = $request->validate([
            'site_id' => 'sometimes|required|exists:sites,id',
            'title'   => 'sometimes|required|string|max:255',
            'slug'    => 'sometimes|required|string|max:255|unique:conversion_texts,slug,'.$conversionText->id,
            'content' => 'sometimes|required|string'
        ]);

        $conversionText->update($data);

        return response()->json($conversionText);
    }

    /**
     * Remove um texto de conversão.
     */
    public function destroy($id)
    {
        $conversionText = ConversionText::findOrFail($id);
        $conversionText->delete();
        return response()->json(null, 204);
    }
}

