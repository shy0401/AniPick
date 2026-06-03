# Price Policy

The phrase requesting non-expensive restaurants is mapped to `max_price = 15000`.

The scorer rewards candidates at or below this price. If the strict candidate pool is too small, the restaurant tool records price relaxation explicitly in `relaxed_fields`.
