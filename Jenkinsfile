pipeline {
    agent any

    environment {
        DOCKER_IMAGE_FRONTEND = "travel-guide-frontend"
        DOCKER_IMAGE_BACKEND = "travel-guide-backend"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Front-end Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install Back-end Dependencies') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Front-end Tests') {
            steps {
                sh 'npm test -- --watchAll=false'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build frontend image
                    sh "docker build -t ${DOCKER_IMAGE_FRONTEND}:${BUILD_NUMBER} ."
                    sh "docker tag ${DOCKER_IMAGE_FRONTEND}:${BUILD_NUMBER} ${DOCKER_IMAGE_FRONTEND}:latest"

                    // Build backend image
                    dir('server') {
                        sh "docker build -t ${DOCKER_IMAGE_BACKEND}:${BUILD_NUMBER} ."
                        sh "docker tag ${DOCKER_IMAGE_BACKEND}:${BUILD_NUMBER} ${DOCKER_IMAGE_BACKEND}:latest"
                    }
                }
            }
        }

        stage('Clean Up') {
            steps {
                sh "docker image prune -f"
            }
        }
    }
}
