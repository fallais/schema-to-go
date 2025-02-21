# SchemaToGo

**SchemaToGo** is used to generate Golang types from a given *JSON Schema*.

It uses both `json-schema-faker` for the JSON generation and `json-to-go` (built by **mholt**) for the Golang generation.

## Limitations

Exactly like `json-to-go` limitations, it is not capable of handling this king of schema below.

```json
{
 "type": "object",
 "properties": {
  "foo": {"type": ["string", "integer"]}
 }
}
```

It will produce :

```go
type AutoGenerated struct {
  Foo int `json:"foo"`
}
```
