# SchemaToGo

**SchemaToGo** generates Golang types from a given *JSON Schema*, in the browser. It is meant as a companion to [json-to-go](https://mholt.github.io/json-to-go/) when you have a schema instead of a sample payload.

It uses `json-schema-faker` to generate a sample document from the schema, then a port of `json-to-go` (built by **mholt**) to generate the Go types.

Try it at https://fallais.github.io/schema-to-go/.

## Development

```sh
npm ci
npm start                      # dev server on http://localhost:4200
npx ng test --watch=false      # unit tests (Vitest)
npm run build
```

## Limitations

Since types are inferred from a generated sample, anything the sample cannot express is lost:

- `type: ["string", "integer"]`, `oneOf` / `anyOf`: only one branch is picked
- `required` is ignored: every field is generated, and `omitempty` is all or nothing
- `$ref` targets are not reused: two properties pointing to the same definition produce two identical structs
- `additionalProperties` maps produce an empty struct instead of `map[string]T`
- nullable types are not turned into pointers
- `enum` values are not turned into constants
- recursive schemas are truncated (`[]any`)
