<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $content = strlen($this->content) > 50
            ? substr($this->content, 0, 50) . '...'
            : $this->content;

        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'category' => CategoryResource::make($this->whenLoaded('category')),
            'title' => $this->title,
            'content' => $content,
            'created_at' => $this->created_at->toDateTimeString()
        ];
    }
}
