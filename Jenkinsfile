pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/ryofac/patroArcadeServer-testando-jenkins.git'
            }
        }
        stage('Build') {
            steps {
                sh 'chmod +x ./scripts/build.sh'
                sh './scripts/build.sh'
            }
        }
        stage('Deploy') {
            steps {
                sh 'chmod +x ./scripts/deploy.sh'
                sh './scripts/deploy.sh'
            }
        }
    }
}
