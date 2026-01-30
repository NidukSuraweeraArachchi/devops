#!/bin/bash
# Update the system
dnf update -y

# Install Java (Amazon Corretto 17)
dnf install java-17-amazon-corretto -y

# Install Jenkins
wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
dnf upgrade -y
dnf install jenkins -y
systemctl enable jenkins
systemctl start jenkins

# Install Docker
dnf install docker -y
systemctl enable docker
systemctl start docker
usermod -aG docker jenkins

# Install AWS CLI
# Amazon Linux 2023 usually comes with AWS CLI v2, but we verify/install
if ! command -v aws &> /dev/null
then
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
fi

# Print versions for verification (viewable in system log)
java -version
jenkins --version
docker --version
aws --version
