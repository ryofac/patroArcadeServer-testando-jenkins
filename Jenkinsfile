pipeline {
    agent any
    tools {
        nodejs 'nodelatest' 
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/ryofac/patroArcadeServer-testando-jenkins.git'
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'chmod +x ./scripts/build.sh'
                    sh './scripts/build.sh'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh 'chmod +x ./scripts/deploy.sh'
                    sh './scripts/deploy.sh'
                }
                archiveArtifacts allowEmptyArchive: true, artifacts: 'server.log'
            }
        }
    }
}
