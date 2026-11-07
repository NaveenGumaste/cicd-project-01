FROM jenkins/jenkins:lts-jdk21

USER root

# Install Docker CLI and utilities
RUN apt-get update && \
    apt-get install -y docker.io curl unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Bun
USER jenkins

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/var/jenkins_home/.bun/bin:${PATH}"