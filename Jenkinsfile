// Sample Jenkinsfile for Cypress Tests that can be used in a Jenkins pipeline
// This Jenkinsfile builds a Docker image for Cypress tests, runs the tests, and archives the
pipeline {
    agent any

    environment {
        CYPRESS_BASE_URL = 'https://app.qa.nesto.ca'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build('cypress-tests')
                }
            }
        }

        stage('Run Cypress Tests') {
            steps {
                script {
                    dockerImage.inside("-v ${env.WORKSPACE}") {
                        sh 'npm ci'
                        sh 'npx cypress run --browser chrome'
                    }
                }
            }
        }
    }

    post {
        always {
            junit 'cypress/results/*.xml'
            archiveArtifacts 'cypress/videos/**/*.*'
            archiveArtifacts 'cypress/screenshots/**/*.*'
        }
        failure {
            echo 'Cypress tests failed!'
        }
    }
}
