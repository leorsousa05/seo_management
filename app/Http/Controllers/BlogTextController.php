<?php

namespace App\Http\Controllers;

use App\Models\BlogText;
use Illuminate\Http\Request;

class BlogTextController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('site_id')) {
            $texts = BlogText::where('site_id', $request->site_id)->get();
        } else {
            $texts = BlogText::all();
        }
    return response()->json($texts);
    }

public function store(Request $request)
{
    $data = $request->validate([
        'site_id'           => 'required|exists:sites,id',
        'blog_category_id'  => 'nullable|exists:blog_categories,id',
        'title'             => 'required|string|max:255',
        'slug'              => 'required|string|max:255|unique:blog_texts',
        'content'           => 'required|string'
        ]);

    $blogText = BlogText::create($data);

    return response()->json($blogText, 201);
    }

    public function show($id)
    {
        $blogText = BlogText::findOrFail($id);
        return response()->json($blogText);
    }

    public function update(Request $request, $id)
    {
        $blogText = BlogText::findOrFail($id);

        $data = $request->validate([
            'site_id'           => 'sometimes|required|exists:sites,id',
            'blog_category_id'  => 'sometimes|nullable|exists:blog_categories,id',
            'title'             => 'sometimes|required|string|max:255',
            'slug'              => 'sometimes|required|string|max:255|unique:blog_texts,slug,'.$blogText->id,
            'content'           => 'sometimes|required|string'
        ]);

        $blogText->update($data);

        return response()->json($blogText);
    }

    public function destroy($id)
    {
        $blogText = BlogText::findOrFail($id);
        $blogText->delete();
        return response()->json(null, 204);
    }
}

