# 2nd Brain

# Repo 1 The Source
Here the clone of Quartz lives, this repo here

When cloning repo1 include the submodule of Repo 2:
```
git clone <user>/<repo1>--recurse-submodules
```
if you didnt you can still add it by
```
git submodule init
git submodule update
```

Now the action to deploy needs to include the **submodule: recursive:**
```

name: Deploy Quartz site to GitHub Pages

on:
  push:
    branches:
      - v4

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Fetch all history for git info
          submodules: recursive # Add this line
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Install Dependencies
        run: npm ci
      - name: Build Quartz
        run: npx quartz build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

# Repo 2 The Content
Here only the content lives. This is included into repo 1 as submodule
```
git submodule add <user>/<repo1> content

```

Now we need to add an action to trigger and update to the parent repo 1 whenever the content changes in Repo 2:
```

name: Update Parent Repository

on:
  push:
    branches:
      - main

jobs:
  update-parent:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout parent repository
        uses: actions/checkout@v4
        with:
          repository: pnposch/2ndbrain
          # Use the SSH key instead of a token
          ssh-key: ${{ secrets.DEPLOY_KEY }} 
          submodules: true
          
      - name: Update submodules
        run: |
          git submodule update --init --recursive
          git submodule update --recursive --remote
          
      - name: Commit and push changes
        run: |
          git config user.email "actions@github.com"
          git config user.name "GitHub Actions - update submodules"
          git add --all
          git commit -m "Update content submodule to latest commit" || echo "No changes to commit"
          git push
```

We will need to add deployment keys here
```
ssh-keygen -f deploy_key -N ""

```
put the private key as variable DEPLOY_KEY into the repo2's secrets and the public key as deployment key to repo1

# Quartz v4
🔗 Read the documentation and get started: https://quartz.jzhao.xyz/

