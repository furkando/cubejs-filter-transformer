# Cube.js Filter to JS Filter Function

[![npm version](https://img.shields.io/npm/v/cubejs-filter-transformer.svg?style=flat-square)](https://www.npmjs.com/package/cubejs-filter-transformer)
[![license](https://img.shields.io/github/license/yourusername/cubejs-filter-transformer.svg?style=flat-square)](https://github.com/furkandoganktf/cubejs-filter-transformer/blob/main/LICENSE)

This package provides a utility function to transform a Cube.js filter into a JavaScript filter function. The transformed filter function can be used to filter data based on the given filter criteria.

## Installation

To install the package, you can use npm or yarn:

```bash
npm install cubejs-filter-transformer
```

or

```bash
yarn add cubejs-filter-transformer
```

## Usage

Import the `transformCubeFilterToJsFilter` function from the package:

```javascript
import { transformCubeFilterToJsFilter } from "cubejs-filter-transformer";
```

The `transformCubeFilterToJsFilter` function takes a Cube.js filter as input and returns a JS filter function. You can then use this function to filter data arrays.

### Example

```javascript
import { transformCubeFilterToJsFilter } from "cubejs-filter-transformer";

const filter = {
  member: "Orders.status",
  operator: "equals",
  values: ["shipped"],
};

const filterFunction = transformCubeFilterToJsFilter(filter);
const data = [
  { status: "shipped" },
  { status: "pending" },
  { status: "shipped" },
];

const filteredData = data.filter(filterFunction);
console.log(filteredData);
// Output: [{ status: 'shipped' }, { status: 'shipped' }]
```

## API

### `transformCubeFilterToJsFilter(filter: Filter): FilterFunction<T>`

Transforms a Cube.js filter into a JS filter function.

- `filter` (required): The Cube.js filter to transform.

- Returns: A JS filter function that can be used to filter data arrays.

## Filter Object

The `filter` parameter should be a valid Cube.js filter object. It can have the following structure:

```typescript
interface Filter {
  member: string;
  operator: CubeOperatorType;
  values: any[];
}

type UnaryFilter = {
  member: string;
  operator: CubeOperatorType.SET | CubeOperatorType.NOT_SET;
};

type LogicalAndFilter = {
  and: Filter[];
};

type LogicalOrFilter = {
  or: Filter[];
};
```

For detailed information about the `CubeOperatorType` enum and other types, please refer to the [`@cubejs-client/core`](https://www.npmjs.com/package/@cubejs-client/core) package documentation.

## License

This package is licensed under the [MIT License](https://github.com/furkandoganktf/cubejs-filter-transformer/blob/main/LICENSE).

## Contributions

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open a GitHub issue or submit a pull request.
