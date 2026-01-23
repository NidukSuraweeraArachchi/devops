FROM jenkins/jenkins:lts
USER root

# Install Docker CLI
RUN apt-get update && \
    apt-get install -y ca-certificates curl gnupg lsb-release && \
    mkdir -m 0755 -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
      $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null && \
    apt-get update && \
    apt-get install -y docker-ce-cli

# Install Node.js (v20)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Verify installations
RUN docker --version && \
    node --version && \
    npm --version

# Add jenkins user to docker group (optional, requires docker GID to actully match host or use chmod 666 on socket)
# We will handle socket permission in compose or ensuring guid matches, but usually separate group is trickier dynamically. 
# For simplicity in this setup, we rely on the socket being mounted.

USER jenkins
