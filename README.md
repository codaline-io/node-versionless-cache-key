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
5.   Creates and outputs the new version

## Inputs

- **branch**: The name of the branch to check if the current branch is master or a dev-branch. Default `master`.
- **filePath**: The json file path or file name where the `version` field is present. Default `package.json`.

## Outputs

- **version**: The generated version number.

## Example usage

```
uses: codaline-io/dev-version@0.1.2
with:
  branch: feat/dev-branch
  filePath: ./package.json
```
