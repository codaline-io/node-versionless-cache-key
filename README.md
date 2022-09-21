# node-versionless-cache-key

This action generates a cache key out of the package.json and package-lock.json.

The Problem: The package-lock.json contains the package version. If that versions changes the hash of the file changes. To avoid getting a new cache key, when your package version changes this actions strips the version.

It accepts a package.json and package-lock.json file path.
Nothing special is happening. Just replacing the version in package-lock and getting a hash back.

## What is happening

1.   reads json files
2.   grab package name from package.json
3.   search for that package name and its following version key in package-lock.json
4.   replaces all whitespaces, tabs and newlines and the version number with empty string
5.   hashes the file content and output it as cache key

## Inputs

- **packageJSON**: path to package.json file. Default `./package.json`.
- **packageLockJSON**: path to package-lock.json file. Default `./package-lock.json`.

## Outputs

- **cacheKey**: The generated hash over package-lock.json without version number.

## Example usage

```
uses: codaline-io/node-versionless-cache-key@0.0.1
with:
  packageJSON: custom-sub-folder/package-test.json
  packageLockJSON: custom-sub-folder/my-lock-file.json
```
