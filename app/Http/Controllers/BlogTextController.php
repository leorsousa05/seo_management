<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use App\Models\BlogText;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class BlogTextController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = BlogText::query();

            if ($request->has('site_id')) {
                $query->where('site_id', $request->site_id);
        }
        elseif ($request->has('site_domain')) {
            $query->join('sites', 'blog_texts.site_id', '=', 'sites.id')
   ->where('sites.domain', $request->site_domain)
   ->select('blog_texts.*');
        }

        if ($request->has('blog_category_id')) {
            $query->where('blog_category_id', $request->blog_category_id);
        }

        $texts = $query->get();

        $posts = $texts->toArray();

        foreach ($posts as &$post) {
            if (!empty($post['blog_category_id'])) {
                $category = BlogCategory::find($post['blog_category_id']);
                $post['blog_category_name'] = $category ? $category->name : 'Sem categoria';
            } else {
                $post['blog_category_name'] = 'Sem categoria';
            }
        }

        return response()->json($posts);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Erro ao buscar posts',
            'message' => $e->getMessage()
        ], 500);
    }
}

public function store(Request $request)
{
    try {
        $data = $request->validate([
            'site_id'           => 'required|exists:sites,id',
            'blog_category_id'  => 'nullable|exists:blog_categories,id',
            'title'             => 'required|string|max:255',
            'slug'              => [
                'required',
                'string',
                'max:255',
                Rule::unique('blog_texts')->where(function ($query) use ($request) {
                    return $query->where('site_id', $request->site_id);
                    }),
                ],
                'content'           => 'required|string',
            ]);

            $blogText = BlogText::create($data);
            return response()->json($blogText, 201);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erro ao criar post',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $blogText = BlogText::findOrFail($id);
            return response()->json($blogText);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Post não encontrado'], 404);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erro ao buscar post',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $blogText = BlogText::findOrFail($id);
            $data = $request->validate([
                'site_id'           => 'sometimes|required|exists:sites,id',
                'blog_category_id'  => 'sometimes|nullable|exists:blog_categories,id',
                'title'             => 'sometimes|required|string|max:255',
                'slug'              => [
                    'sometimes',
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('blog_texts')
   ->ignore($blogText->id)
   ->where(function ($query) use ($request, $blogText) {
       $siteId = $request->input('site_id', $blogText->site_id);
       return $query->where('site_id', $siteId);
                        }),
                ],
                'content'           => 'sometimes|required|string',
            ]);

            $blogText->update($data);
            return response()->json($blogText);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Post não encontrado'], 404);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erro ao atualizar post',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $blogText = BlogText::findOrFail($id);
            $blogText->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Post não encontrado'], 404);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Erro ao deletar post',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}

