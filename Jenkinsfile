pipeline {
    agent any
    stages {
        stage('Build'){
            steps {
                sh 'make install'
            }
        }
        
        stage('Lint'){
            steps {
                sh 'make eslint'
            }
        }

        stage('Docker'){
            steps {
                sh '/home/ubuntu/docker.sh'
            }
        }
        
        stage('Deploy'){
            steps {
                sh '/home/ubuntu/deploy.sh'
            }
        }
    }
}