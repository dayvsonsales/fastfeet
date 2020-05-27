pipeline {
    agent any

    stages {
        stage('Build'){
            steps {
                make install
            }
        }
        
        stage('Lint'){
            steps {
                make eslint
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