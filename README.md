# bulletfarm-test-repo-gamma
Test Node.js API for bulletfarm agent operator testing.
## Improvement Opportunities
- No input validation on POST /items
- No error handling middleware
- No tests exist
- No pagination on GET /items

## ## API Endpoints
### POST /items

This endpoint allows you to add an item. It requires the following fields in the request body:

- `name`: A string representing the name of the item. It is required and cannot be empty.
- `price`: A positive number representing the price of the item. It is required and must be greater than 0.

#### Validation Errors
If the input validation fails, the response will return a 400 status code with a JSON object containing error messages. For example:

```json
{
  "errors": [
    "Name is required and must be a string.",
    "Price is required and must be a positive number."
  ]
}
```
