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

Compare two names. Return true if they match. Default transforms: [`INS`,`ABBR`].

**valid transforms**:

- `INS` - case insensitive;
- `ABBR` - abbreviation;
- `ATONIC` - ignore letters accents: `Ștefan` == `Stefan`;
- `INS_ATONIC` - case insensitive atonic;
