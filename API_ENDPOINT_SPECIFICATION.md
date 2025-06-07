# Authors API Endpoint Specification

## Endpoint
`GET /api/blogs/{postId}/authors`

## Description
This endpoint returns author information for a specific blog post. It supports both extended author information (with photos, names, and bios) and fallback to simple author names when extended information is not available.

## Request Parameters
- `postId` (path parameter): The unique identifier of the blog post

## Response Format

### Case 1: Extended Author Information Available
When the post has detailed author information, return:

```json
{
  "hasExtendedInfo": true,
  "authors": [
    {
      "id": 1,
      "name": "Dr. Maria Silva",
      "bio": "Médica especialista em cardiologia com mais de 10 anos de experiência na área acadêmica e de pesquisa.",
      "photo": "https://example.com/photos/maria-silva.jpg"
    },
    {
      "id": 2,
      "name": "João Santos", 
      "bio": "Estudante de medicina e pesquisador em saúde pública, com foco em políticas de saúde.",
      "photo": "https://example.com/photos/joao-santos.jpg"
    }
  ]
}
```

### Case 2: No Extended Author Information
When the post only has basic author information, return:

```json
{
  "hasExtendedInfo": false,
  "message": "This post uses legacy author format"
}
```

In this case, the frontend will fallback to displaying the basic author information from the main post object (`post.author`).

## Author Object Schema

When `hasExtendedInfo` is true, each author object should contain:

- `id` (number): Unique identifier for the author
- `name` (string): Full name of the author
- `bio` (string): Brief biography or description (recommended 50-150 characters)
- `photo` (string): URL to the author's profile photo (recommended square format, minimum 150x150px)

## Error Handling

### Post Not Found
```json
{
  "error": "Post not found",
  "status": 404
}
```

### Server Error
```json
{
  "error": "Internal server error",
  "status": 500
}
```

## Implementation Notes

1. **Photo URLs**: Should be absolute URLs pointing to valid image files
2. **Bio Length**: Keep bios concise but informative (50-150 characters recommended)
3. **Fallback Handling**: Always check if extended info exists before returning detailed author data
4. **Performance**: Consider caching author information as it's likely to be accessed frequently
5. **Validation**: Ensure all required fields are present when `hasExtendedInfo` is true

## Frontend Behavior

- When `hasExtendedInfo` is `true`: Display rich author cards with photos, names, and bios
- When `hasExtendedInfo` is `false` or endpoint fails: Display simple "Escrito por: {post.author}" format
- Photo error handling: If an author photo fails to load, fallback to placeholder image

## Example Use Cases

1. **New Posts**: Posts created with the new system will have extended author information
2. **Legacy Posts**: Older posts will return `hasExtendedInfo: false` and use the original author field
3. **Multiple Authors**: Support for collaborative posts with multiple authors
4. **Single Author**: Works seamlessly with single author posts 