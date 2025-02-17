<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use Illuminate\Http\Request;

class BlogCategoryController extends Controller
{
    public function index()
    {
        $categories = BlogCategory::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'site_id' => 'required|exists:sites,id',
            'name'    => 'required|string|max:255',
            'slug'    => 'required|string|max:255|unique:blog_categories'
        ]);

        $category = BlogCategory::create($data);

        return response()->json($category, 201);
    }

    public function show($id)
    {
        $category = BlogCategory::findOrFail($id);
        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
        $category = BlogCategory::findOrFail($id);

        $data = $request->validate([
            'site_id' => 'sometimes|required|exists:sites,id',
            'name'    => 'sometimes|required|string|max:255',
            'slug'    => 'sometimes|required|string|max:255|unique:blog_categories,slug,'.$category->id,
        ]);

        $category->update($data);

        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = BlogCategory::findOrFail($id);
        $category->delete();
        return response()->json(null, 204);
    }
}

