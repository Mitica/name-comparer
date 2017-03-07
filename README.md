# name-comparer

A nodejs module for comparing two names(one line strings).

## Usage

```
const compare = require('name-comparer').compare;

compare('Name', 'name'); // true
compare('B. Obama', 'Barack Obama'); // true
compare('US', 'United States'); // true
```

## API

### compare(name1:string, name2:string, options?:{ transforms:string[] }):boolean

Compare two names. Return true if they match. Default transforms: [`CI`,`ABBR`].

**valid transforms**:

- `CI` - case insensitive;
- `ABBR` - abbreviation;
- `ATONIC` - ignore letters accents: `Ștefan` == `Stefan`;
- `CI_ATONIC` - case insensitive atonic;
- `START` - name2 starts with name1: `University` == `University of NY`;
- `CI_START` - case insensitive name2 starts with name1: `university` == `University of NY`;
