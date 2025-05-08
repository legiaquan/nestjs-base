FROM node:22-alpine

WORKDIR /app

# Install dependencies
RUN apk add --no-cache make gcc g++ python3 git

# Install global packages
RUN npm install -g pnpm typescript ts-node

# Create a non-root user
RUN addgroup -S nodeapp && \
    adduser -S -G nodeapp nodeapp

# Set ownership
RUN chown -R nodeapp:nodeapp /app

# Switch to non-root user
USER nodeapp

# Keep container running
CMD ["sh", "-c", "tail -f /dev/null"]
