node ('') {
  stage ('buildInDevelopment') {
    openshiftBuild(namespace: 'devops', buildConfig: 'nodejs-persistent', showBuildLogs: 'true')
  }
  stage ('deployInDevelopment') {
    openshiftDeploy(namespace: 'devops', deploymentConfig: 'nodejs-persistent')
  }
}
