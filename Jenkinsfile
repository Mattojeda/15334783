#!groovy

pipeline {
 agent any
 options {
  timeout(time: 10, unit: 'MINUTES')
 }

 parameters {
  string(name: 'USER', defaultValue: '', description: 'Correo electronico')
  string(name: 'COMPONENTENAME', defaultValue: 'my-app', description: 'Identificador Servicio')
  string(name: 'ACCION', defaultValue: 'Compilacion', description: 'Seleccione la accion a realizar: test, Compilacion, Despliegue')


 }

 environment {
  REGISTRY_URL = "${REGISTRY_URL}"
  REGISTRY_URL_IP = "${REGISTRY_URL_IP}"
  REGISTRY_CREDENTIALS = "${REGISTRY_CREDENTIALS}"
  NEXUS_DOCKER_URL = "${NEXUS_DOCKER_URL}"
  SONAR_SCANNER_HOME= "${SONAR_SCANNER_HOME}"
  SONAR_URL= "${SONAR_URL}"
  HOME_PROYECT= "${HOME_PROYECT}"
 }

 stages {
  stage('INITIALIZE') {
   agent any
   steps {
    initialize()
   }
  }

  stage('BUILD AND REGISTER IMAGE') {
   agent any
   steps {
    buildAndRegisterDockerImage()
        echo "buildAndRegisterDockerImage"
        echo "${env.REGISTRY_URL_IP}"
   }
  }

            
  stage('DEPENDENCIES') {
      agent any
            steps {
                sh "npm install --save-dev supertest should mocha"
                sh "npm install --save-dev mocha" 
                sh "npm install --save-dev typescript" 
    }
  }               
               
  stage('SONARQUBE') {
      agent any
            steps {
              sh "${SONAR_SCANNER_HOME}/sonar-scanner -Dsonar.host.url=${SONAR_URL} -Dsonar.projectName=${env.IMAGE_NAME} -Dsonar.projectVersion=${env.BUILD_ID} -Dsonar.projectKey=${env.IMAGE_NAME} -Dsonar.sources=. -Dsonar.projectBaseDir=${HOME_PROYECT}" 
    }
  }               
              
  stage('DEPLOY') {
       agent any
            steps {
             sh "docker run -d -p  8085:80 ${env.IMAGE_NAME}:${env.BUILD_ID}"
             sh "curl localhost:8085"

   }
  }
  
     stage('MOCHA') {
      agent any
            steps {
                sh "npm test" 
    }
  }
  
  stage('Eliminar') {
   agent any
   steps {

    echo "Delete image from server"
    echo "${env.REGISTRY_URL_IP}"
    sh "docker rmi ${env.REGISTRY_URL_IP}/${env.IMAGE_NAME}:${env.BUILD_ID} -f"
    sh "docker rmi ${env.IMAGE_NAME}:${env.BUILD_ID} -f"
   }
  }
  
  }
}
def initialize() {
 env.REGISTRY_URL = params["REGISTRY_URL"]
 env.REGISTRY_URL_IP = "REGISTRY_URL_IP"
 env.REGISTRY_CREDENTIALS = params["REGISTRY_CREDENTIALS"]
 env.IMAGE_NAME = params["COMPONENTENAME"]
 NEXUS_DOCKER_URL = env.NEXUS_DOCKER_URL

}

def buildAndRegisterDockerImage() {
 def buildResult
 docker.withRegistry("${env.REGISTRY_URL}", "${env.REGISTRY_CREDENTIALS}") {
  echo "Building ${env.IMAGE_NAME}"
  buildResult = docker.build("${env.IMAGE_NAME}:${env.BUILD_ID}")
  echo "Register ${env.IMAGE_NAME} at ${env.REGISTRY_URL}"
  buildResult.push("${env.BUILD_ID}")
  echo "Disconnect from registry"
  sh "docker logout ${env.REGISTRY_URL}"
 }
}

def registryDocker() {
 def buildResult
 docker.withRegistry("${env.REGISTRY_URL}", "${env.REGISTRY_CREDENTIALS}")
}