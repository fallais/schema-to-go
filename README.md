# SchemaToGo

**SchemaToGo** generates Golang types from a given *JSON Schema*, in the browser. It is meant as a companion to [json-to-go](https://mholt.github.io/json-to-go/) when you have a schema instead of a sample payload.

It reads the schema directly and uses the same field naming rules as `json-to-go` (built by **mholt**).

Try it at https://fallais.github.io/schema-to-go/.

## Mapping

| JSON Schema | Go |
|---|---|
| `string`, `integer`, `number`, `boolean` | `string`, `int`, `float64`, `bool` |
| `format`: `date-time`, `byte`, `int32`, `int64`, `float`, ... | `time.Time`, `[]byte`, `int32`, `int64`, `float32`, ... |
| `object` with `properties` | struct, optional fields get `omitempty` |
| `object` with `additionalProperties` / `patternProperties` only | `map[string]T` |
| `array` | `[]T`, element types are named in singular (`addresses` → `[]Address`) |
| `$ref` to `$defs` / `definitions` / `$anchor` | one named type, reused everywhere |
| `allOf` | `$ref` parts are embedded, inline parts are merged |
| `enum` | named type with constants |
| `["T", "null"]`, `nullable: true`, `anyOf: [T, null]` | `*T` |
| `oneOf` / `anyOf` of different types | `any`, with a comment listing the variants |
| `title` / `description` | type name / doc comments |

Options:

- **Inline type definitions**: nested objects become anonymous structs, like json-to-go. Referenced definitions and enums stay named.
- **Omitempty on all fields**: by default only optional fields get `omitempty`.
- **Pointers for optional fields**: optional scalars and structs become pointers.

## Limitations

- Remote `$ref`s (other files, URLs) are not fetched and become `any`.
- An object with both `properties` and `additionalProperties` only keeps the declared properties.
- `if` / `then` / `else`, `not` and `dependentSchemas` are ignored.
- Imports are not generated, and fields are not aligned: run `goimports` or `gofmt` on the output.

## Development

```sh
npm ci
npm start                      # dev server on http://localhost:4200
npx ng test --watch=false      # unit tests (Vitest)
npm run build
```

## License

MIT, see [LICENSE](LICENSE). `src/app/naming.ts` is ported from [mholt/json-to-go](https://github.com/mholt/json-to-go), MIT licensed, Copyright (c) 2014 Matt Holt.
