pipeline {
    // Use the official Playwright image so browsers + OS deps are already
    // installed — this avoids flaky/slow "playwright install --with-deps"
    // steps on a bare Jenkins agent.
    agent {
    docker {
        image 'node:20-jammy'
        args '-u root:root'
    }
}

    options {
        timestamps()
        // Keep the last 10 builds' artifacts/history around.
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // Fail fast if a run hangs.
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        CI = 'true'
    }

    stage('Install dependencies') {
    steps {
        sh 'npm ci'
        sh 'npx playwright install --with-deps'
    }
}

        stage('Run Playwright tests') {
            steps {
                // Non-zero exit code from failed tests shouldn't kill the
                // whole pipeline before we've had a chance to publish
                // reports, so capture status and act on it after.
                sh 'npx playwright test || true'
            }
        }

        stage('Publish results') {
            steps {
                junit 'test-results/junit.xml'

                publishHTML(target: [
                    reportName : 'Playwright HTML Report',
                    reportDir  : 'playwright-report',
                    reportFiles: 'index.html',
                    keepAll    : true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])

                archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
            }
        }

        stage('Evaluate test result') {
            steps {
                script {
                    def testResults = junit testResults: 'test-results/junit.xml'
                    if (testResults.failCount > 0) {
                        error("${testResults.failCount} test(s) failed.")
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        failure {
            echo 'Build failed — check the JUnit results and HTML report above.'
        }
    }
}
