<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class BlogCategoryController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('site_id')) {
                $categories = BlogCategory::where('site_id', $request->site_id)->get();
            } elseif ($request->has('site_domain')) {
                $categories = BlogCategory::join('sites', 'blog_categories.site_id', '=', 'sites.id')
                    ->where('sites.domain', $request->site_domain)
                    ->select('blog_categories.*')
                    ->get();
            } else {
                $categories = BlogCategory::all();
            }

            return response()->json($categories);
        } catch (Exception $e) {
            return response()->json([
                'error'   => 'Erro ao buscar categorias',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'site_id' => 'required|exists:sites,id',
                'name'    => 'required|string|max:255',
                'slug'    => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('blog_categories')->where(function ($query) use ($request) {
                        return $query->where('site_id', $request->site_id);
                    }),
                ],
            ]);

            $category = BlogCategory::create($data);
            return response()->json($category, 201);
        } catch (Exception $e) {
            return response()->json([
                'error'   => 'Erro ao criar categoria',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $category = BlogCategory::findOrFail($id);
            return response()->json($category);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Categoria não encontrada'], 404);
        } catch (Exception $e) {
            return response()->json([
                'error'   => 'Erro ao buscar categoria',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $category = BlogCategory::findOrFail($id);

            $data = $request->validate([
                'site_id' => 'sometimes|required|exists:sites,id',
                'name'    => 'sometimes|required|string|max:255',
                'slug'    => 'sometimes|required|string|max:255|unique:blog_categories,slug,' . $category->id,
            ]);

            $category->update($data);
            return response()->json($category);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Categoria não encontrada'], 404);
        } catch (Exception $e) {
            return response()->json([
                'error'   => 'Erro ao atualizar categoria',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $category = BlogCategory::findOrFail($id);
            $category->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Categoria não encontrada'], 404);
        } catch (Exception $e) {
            return response()->json([
                'error'   => 'Erro ao deletar categoria',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}

