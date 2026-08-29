FROM node:20-bookworm

# Bake all three browsers + their OS-level dependencies into the image
# once, so Jenkins builds never need to install anything beyond npm packages.
RUN npm install -g playwright@1.62.1 \
    && npx playwright install --with-deps