<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\IndexRequest;
use App\Http\Requests\Post\StoreRequest;
use App\Http\Requests\Post\UpdateRequest;
use App\Http\Resources\PostResource;
use App\Models\Permission;
use App\Models\Post;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request): AnonymousResourceCollection
    {
        $this->authorize(Permission::PERMISSION_POST_VIEW);

        $orderField = $request->input('order_field', 'id');
        $orderDirection = $request->input('order_direction', 'desc');

        if (!in_array($orderField, ['id', 'title'])) {
            $orderField = 'id';
        }
        if (!in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }

        $posts = Post::with('category')
            ->when($request->filled('category_id'), function ($query) use ($request) {
                $query->where('category_id', $request->category_id);
            })
            ->orderBy($orderField, $orderDirection)
            ->paginate(10);

        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request): JsonResource
    {
        $this->authorize(Permission::PERMISSION_POST_CREATE);

        $post = Post::create($request->validated());

        return PostResource::make($post);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post): JsonResource
    {
        $this->authorize(Permission::PERMISSION_POST_VIEW);

        return PostResource::make($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Post $post): JsonResource
    {
        $this->authorize(Permission::PERMISSION_POST_UPDATE);

        $post->update($request->validated());

        return PostResource::make($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): Response
    {
        $this->authorize(Permission::PERMISSION_POST_DELETE);

        $post->delete();

        return response()->noContent();
    }
}
