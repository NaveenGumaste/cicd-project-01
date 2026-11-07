pipeline {
    agent any

    triggers {
        pollSCM('H/1 * * * *')
    }

    environment {
        APP_NAME = 'bun-cicd-app'
        IMAGE_NAME = 'bun-cicd-project'
        APP_PORT = '3001'
        CONTAINER_PORT = '3000'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Bun dependencies...'
                sh 'bun install --frozen-lockfile'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests...'
                sh 'bun test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application container...'

                sh '''
                    docker rm -f ${APP_NAME} 2>/dev/null || true

                    docker run -d \
                        --name ${APP_NAME} \
                        --restart unless-stopped \
                        -p ${APP_PORT}:${CONTAINER_PORT} \
                        ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking application health...'

                sh '''
                    for i in $(seq 1 15); do
                        if curl -fsS http://host.docker.internal:${APP_PORT}/health; then
                            echo "Application deployment successful!"
                            exit 0
                        fi
                        sleep 2
                    done

                    echo "Application health check failed"
                    docker logs ${APP_NAME}
                    exit 1
                '''
            }
        }
    }

    post {
        success {
            echo 'Jenkins CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'Jenkins CI/CD pipeline failed. Check the console output.'
        }

        always {
            echo 'Pipeline execution finished.'
        }
    }
}
