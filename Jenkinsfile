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
                sh docker.sh
            }
        }
        
        stage('Deploy'){
            steps {
                sh deploy.sh
            }
        }
    }
}