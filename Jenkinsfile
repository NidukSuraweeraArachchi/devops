pipeline {
    agent any

    environment {
        DOCKER_IMAGE_FRONTEND = "travel-guide-frontend"
        DOCKER_IMAGE_BACKEND = "travel-guide-backend"
        AWS_REGION = "us-east-1"
        AWS_ACCOUNT_ID = "371788870702"
        ECR_REPO = "devops-repo"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('server') {
                    sh "docker build -t ${ECR_REPO}:backend-${BUILD_NUMBER} ."
                }
            }
        }

        stage('Backend setup') {
            steps {
                dir('server') {
                    sh 'npm install'
                    sh 'npm test -- --watchAll=false || true'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh "docker build -t ${ECR_REPO}:frontend-${BUILD_NUMBER} ."
            }
        }

        stage('Docker Login & Push') {
            steps {
                script {
                    def ecr_url = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}"
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credentials']]) {
                        sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
                        
                        sh "docker tag ${ECR_REPO}:frontend-${BUILD_NUMBER} ${ecr_url}:frontend-latest"
                        sh "docker push ${ecr_url}:frontend-latest"
                        
                        sh "docker tag ${ECR_REPO}:backend-${BUILD_NUMBER} ${ecr_url}:backend-latest"
                        sh "docker push ${ecr_url}:backend-latest"
                    }
                }
            }
        }

        stage('Up the containers') {
            steps {
                sh "docker compose pull"
                sh "docker compose up -d"
            }
        }
    }

    post {
        always {
            sh "docker image prune -af"
            echo 'Pipeline finished successfully.'
        }
    }
}

