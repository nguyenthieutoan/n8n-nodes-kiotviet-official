# Release Instructions

This repository is configured to publish automatically to the npm registry via GitHub Actions whenever changes are pushed to `main` or a new Git Tag is created.

## How it Works
1. When you push to `main`, the **CI & Publish** workflow is triggered.
2. The workflow automatically compares the version in `package.json` with the latest published version on NPM.
3. If the version hasn't been changed manually, it **automatically bumps the patch version**, tags it, and commits it back with `[skip ci]`.
4. It builds the package, executes linter checks, and publishes it with cryptographic **provenance** using the `NPM_TOKEN` secret.
5. It creates an official GitHub Release with release notes.

---

## Step-by-Step Release Guide

### 1. Verify Build Locally
Ensure the code builds and type-checks successfully:
```bash
npm run build
npm run lint
```

### 2. (Optional) Manually Bump Version
If you want to specify a minor or major release:
```bash
# Patch release (0.1.0 → 0.1.1)
npm version patch

# Minor release (0.1.0 → 0.2.0)
npm version minor

# Major release (0.1.0 → 1.0.0)
npm version major
```

### 3. Push to GitHub
Push your commits (and tags if created):
```bash
git push origin main --follow-tags
```
GitHub Actions will take care of the rest!
