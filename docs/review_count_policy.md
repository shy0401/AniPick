# Review Count Policy

The assignment prompt asks for restaurants with good reviews. The parser maps this request to:

- `min_rating = 4.0`
- `min_review_count = 50`

If strict matching cannot fill the requested count, relaxation is recorded in the tool observation instead of being hidden.
